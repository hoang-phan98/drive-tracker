import googleapis from "./googleapis";

const STORAGE_KEY = "DRIVE_TRACKER/user";

class UserStorageService {
  constructor() {
    this.user = null;
    this.data = {};

    this.handleAuthStateChanged = this.handleAuthStateChanged.bind(this);

    this.init();
  }

  init() {
    const auth2 = googleapis.auth2.getAuthInstance();
    this.subscription = auth2.isSignedIn.listen(this.handleAuthStateChanged);
    this.handleAuthStateChanged(auth2.isSignedIn.get());
  }

  handleAuthStateChanged(isSignedIn) {
    const auth2 = googleapis.auth2.getAuthInstance();

    if (!isSignedIn) {
      if (this.user) {
        this.persist();
      }
      this.data = {};
    } else {
      this.user = auth2.currentUser.get();
      if (this.user) {
        this.load();
      }
    }
  }

  get() {
    return this.data;
  }

  // Update the user's persisted data
  // The updater can either be a function that receives the current data and returns
  // the new data, or it can be an object that will be shallow merged with the current data object
  update(updater) {
    if (typeof updater === "function") {
      this.data = updater(this.data);
    } else {
      this.data = Object.assign({}, this.data, updater);
    }

    this.persist();
  }

  // Save the user's data to local storage
  persist() {
    localStorage.setItem(
      STORAGE_KEY + "/" + this.user.getId(),
      JSON.stringify(this.data)
    );
  }

  // Load the current user's data from local storage, if they have any
  load() {
    let record = localStorage.getItem(STORAGE_KEY + "/" + this.user.getId());
    this.data = record ? JSON.parse(record) : {};
  }

  dispose() {
    this.subscription.remove();
  }
}

export default UserStorageService;
