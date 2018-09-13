import * as a from "awaiting";
import googleapis from "./googleapis";

const GOOGLE_DRIVE_FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";

/**
 * Represents contribution data for a single file
 */
class FileContributions {
  static get fields() {
    return [
      "kind",
      "id",
      "name",
      "mimeType",
      "createdTime",
      "headRevisionId"
    ].join(", ");
  }

  static get revisionFields() {
    return [
      "kind",
      "mimeType",
      "modifiedTime",
      "id",
      `lastModifyingUser(${["kind", "displayName", "emailAddress"].join(", ")})`
    ].join(", ");
  }

  constructor(data) {
    this.data = data;
    this.revisions = [];
    this.contributions = [];
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  /**
   * Get revision data for this file and populate contributions
   */
  async fetchRevisionData() {
    const options1 = {
      fileId: this.id,
      pageSize: 200,
      fields: [
        "nextPageToken",
        `revisions(${FileContributions.revisionFields})`
      ].join(", ")
    };
    const data1 = await depaginate(
      options => googleapis.client.drive.revisions.list(options),
      "revisions",
      options1
    );

    this.revisions = data1.revisions;
    this.contributions = this.getContributions();

    return this.revisions;
  }

  /**
   * Get an array of contribution events for this file (based on revisions)
   * @returns an Array containing Objects with fields { type, user, revision, time }
   */
  getContributions() {
    return this.revisions.map((revision, i) => {
      const creation = i === 0;
      return {
        type: creation ? "CREATE" : "EDIT",
        user: revision.lastModifyingUser,
        revision: revision,
        time: creation ? this.data.createdTime : revision.modifiedTime
      };
    });
  }
}

/**
 * Represents contribution data for an entire folder
 */
class FolderContributions {
  static get fields() {
    return ["name", "id", "kind", "mimeType"].join(", ");
  }

  constructor(data) {
    this.data = data;
    this.files = new Map();
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  /**
   * Populate this folder's files with instances of FileContributions
   * @returns a Promise resolving to a Map containing FileContributions for each
   *  file keyed by its id
   */
  async fetchChildFilesContributionData() {
    const options1 = {
      q: `'${this.id}' in parents`,
      pageSize: 100,
      fields: ["nextPageToken", `files(${FileContributions.fields})`].join(", ")
    };
    const data1 = await depaginate(
      options => googleapis.client.drive.files.list(options),
      "files",
      options1
    );

    for (const data2 of data1.files) {
      if (data2.mimeType !== GOOGLE_DRIVE_FOLDER_MIME_TYPE) {
        const file = new FileContributions(data2);
        this.files.set(file.id, file);
      }
    }

    await a.map([...this.files.values()], 4, file => file.fetchRevisionData());

    return this.files;
  }

  /**
   * Get a given file by its id
   * @param {string} id
   * @returns FileContributions or null
   */
  getFile(id) {
    return this.files.get(id);
  }
}

/**
 * A service for getting folder contribution data, caching results.
 */
class FolderContributionsService {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Get contribution data for a google drive folder
   * @param {string} id the id of the folder
   * @returns a Promise resolving to an instance of FolderContributions
   */
  async fetchFolderContributionData(id) {
    // Check the cache first
    let folder;
    if ((folder = this.cache.get(id))) {
      return folder;
    }

    // Verify the folder actually exists
    let data1;
    try {
      ({ result: data1 } = await googleapis.client.drive.files.get({
        fileId: id,
        fields: FolderContributions.fields
      }));

      if (data1.mimeType !== GOOGLE_DRIVE_FOLDER_MIME_TYPE) {
        throw new Error("The specified resource is not a folder.");
      }
    } catch (err) {
      // TODO :)
      throw err;
    }

    folder = new FolderContributions(data1);
    await folder.fetchChildFilesContributionData();

    this.cache.set(folder.id, folder);

    return folder;
  }
}

export default FolderContributionsService;

async function depaginate(fetch, field, options) {
  if (!(options.fields && options.fields.includes("nextPageToken"))) {
    throw new Error(
      "You must have the value `nextPageToken` in the fields specifier."
    );
  }

  let acc = {};
  do {
    const { result } = await fetch(
      Object.assign({}, options, { pageToken: acc.nextPageToken })
    );
    Object.assign(acc, result, {
      [field]: acc[field] ? acc[field].concat(result[field]) : result[field],
      nextPageToken: result.nextPageToken || null
    });
  } while (acc.nextPageToken);
  return acc;
}
