/* global gapi */
const CLIENT_ID =
  "651208341504-ib5m22804n5cvl8ih18rimd2hu5trv7l.apps.googleusercontent.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

window.gapi = window.gapi || {};

async function init() {
  if (!window.gapi) {
    const script = document.getElementById("gapi-js");
    await new Promise(resolve => {
      const handler = () => {
        script.removeEventListener("onload", handler);
        resolve();
      };
      script.addEventListener("onload", handler);
    });
  }

  await new Promise(resolve => window.gapi.load("client:auth2", resolve));

  await window.gapi.client.init({
    // apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  });

  return window.gapi;
}

// Try to initialise the Google APIs as soon as possible
gapi.ready = init();

export default gapi;
