import * as a from "awaiting";
import googleapis from "./googleapis";

const GOOGLE_DRIVE_FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
const USER_FIELDS = ["kind", "displayName", "emailAddress"].join(", ");
const REVISION_FIELDS = [
  "kind",
  "mimeType",
  "modifiedTime",
  "id",
  `lastModifyingUser(${USER_FIELDS})`
].join(", ");

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
      "headRevisionId",
      `permissions(${USER_FIELDS})`
    ].join(", ");
  }

  constructor(data) {
    this.data = data;
    this.revisions = [];
    this.contributions = [];
    this.contributors = new Map();
  }

  static async create(data) {
    const file = new FileContributions(data);
    await file.fetchRevisionData();
    file.getContributions();
    file.getContributors();
    return file;
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
      fields: ["nextPageToken", `revisions(${REVISION_FIELDS})`].join(", ")
    };
    const data1 = await depaginate(
      options => googleapis.client.drive.revisions.list(options),
      "revisions",
      options1
    );

    this.revisions = data1.revisions;

    return this.revisions;
  }

  /**
   * Get an array of contribution events for this file (based on revisions)
   * @returns an Array containing Objects with fields { type, user, revision, time }
   */
  getContributions() {
    this.contributions = this.revisions.map((revision, i) => {
      const creation = i === 0;
      return {
        type: creation ? "CREATE" : "EDIT",
        user: revision.lastModifyingUser,
        revision: revision,
        time: creation ? this.data.createdTime : revision.modifiedTime
      };
    });
  }

  getContributors() {
    const contributors = new Map();
    for (const contribution of this.contributions) {
      if (!contributors.get(contribution.user.emailAddress)) {
        contributors.set(contribution.user.emailAddress, contribution.user);
      }
    }
    this.contributors = contributors;
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
    this.contributors = new Map();
  }

  static async create(data) {
    const folder = new FolderContributions(data);
    await folder.fetchChildFilesContributionData();
    folder.getContributors();
    return folder;
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

    const data2 = data1.files.filter(
      file => file.mimeType !== GOOGLE_DRIVE_FOLDER_MIME_TYPE
    );

    await a.map(data2, 4, async data3 => {
      const file = await FileContributions.create(data3);
      this.files.set(file.id, file);
    });
  }

  getContributors() {
    const contributors = new Map();
    for (const file of this.files.values()) {
      for (const contributor of file.contributors.values()) {
        if (!contributors.get(contributor.emailAddress)) {
          contributors.set(contributor.emailAddress, contributor);
        }
      }
    }
    this.contributors = contributors;
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

    folder = await FolderContributions.create(data1);
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
