import * as a from "awaiting";
import googleapis from "./googleapis";

const GOOGLE_DRIVE_FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
const GOOGLE_DRIVE_FILE_MIME_TYPE = "application/vnd.google-apps.document";
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
    this.contributors = {};
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
    const contributors = {};
    for (const contribution of this.contributions) {
      if (!contributors[contribution.user.emailAddress]) {
        contributors[contribution.user.emailAddress] = contribution.user;
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
    this.files = {};
    this.contributors = {};
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
      this.files[file.id] = file;
    });
  }

  getContributors() {
    for (const file of Object.values(this.files)) {
      for (const contributor of Object.values(file.contributors)) {
        if (!this.contributors[contributor.emailAddress]) {
          this.contributors[contributor.emailAddress] = contributor;
        }
      }
    }
  }
}

/**
 * A service for getting folder contribution data, caching results.
 */
class ContributionsService {
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

  async fetchFileContributionData(id) {
    // Check the cache first
    let file;
    if ((file = this.cache.get(id))) {
      return file;
    }

    // Verify the folder actually exists
    let data1;
    try {
      ({ result: data1 } = await googleapis.client.drive.files.get({
        fileId: id, ///////find the raw data of the file
        fields: FileContributions.fields
      }));

      if (data1.mimeType !== GOOGLE_DRIVE_FILE_MIME_TYPE) {
        throw new Error("The specified resource is not a file.");
      }
    } catch (err) {
      // TODO :)
      throw err;
    }

    file = await FileContributions.create(data1);
    this.cache.set(file.id, file);

    return file;
  }
}

export default ContributionsService;

async function depaginate(fetch, field, options) {
  if (!(options.fields && options.fields.includes("nextPageToken"))) {
    throw new Error(
      "You must have the value `nextPageToken` in the fields specifier."
    );
  }

  let acc = {};
  do {
    const { result } = await fetch(
      Object.assign({}, options, {
        pageToken: acc.nextPageToken
      })
    );
    Object.assign(acc, result, {
      [field]: acc[field] ? acc[field].concat(result[field]) : result[field],
      nextPageToken: result.nextPageToken || null
    });
  } while (acc.nextPageToken);
  return acc;
}
