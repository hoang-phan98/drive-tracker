Client Review
---

This document contains instructions for the client to review the project at each checkpoint.

# Checkpoint 1 (Sprint 2) Fri 7th September

The last commit of this sprint can be found under the `checkpoint-1` or `sprint-2` tag.

The following features are new in this release:
- Login/Logout
- Tracked Folder Page
  - Add a tracked folder
  - Preliminary UI for folder preview
- Obtain revision data for all files in a folder
- Preliminary UI for folder contribution analysis

## Setup

Begin by following the instructions in the root `README.md` for 'How to view the project'. You have the option of visiting the live deployment online or running the web server locally.

Ensure you are using an up to date browser. We recommend the latest Google Chrome Browser.

## Login

- Visit the website, you will be taken to the Login Page.
- Click 'Sign In With Google' and follow the instructions in the popup. (Your browser may warn you that the app is untrusted, this is because the app is still in development and has not been reviewed by Google. Ignore this warning.)
- You should be taken to the tracked folder page.

## Logout

- Ensure you are logged in.
- Click on the dropdown button labelled 'User' in the top right corner, in the menu bar.
- Select 'log out'.
- You should be taken back to the login screen.

## Tracked Folders Page

After logging in, you should be taken to the tracked folders page (path  `/`).

### Add a tracked folder

- Press the orange '+' button, a modal should pop up.
- Follow the instructions in the modal to add a tracked folder. Ensure the folder link you use is from the same account you used to log in.
- The folder will be added to the list of tracked folders.
- Click on a row in the list of tracked folders to view revision data for all the files in the folder.

### Preliminary UI for folder preview

On the right side of the page, you will see a folder preview.

In future sprints, this folder preview will show up when you click on a tracked folder and contain a quick summary analysis of the folder, with the option to move to the more detailed folder contribution analysis page.

## Obtain revision data for all files in a folder.

Click on a row in the list of tracked folders after adding a tracked folder to view revision data for files within that folder. It may take a few seconds to load and process the data.

At the top you will see a title with the folder name and id.

In the 'contribution data' tab you can see for each file
- The name and id of the file
- A table of all revisions of that file.

You can see all of the raw data we fetch in the 'raw' tab.

This is raw data that will be used to create graphs and charts, you can see a preview of the graphs and charts in 'Preliminary UI for folder contribution analysis'.

## Preliminary UI for folder contribution analysis

Visit `/folderpage` to view the preliminary UI for the folder contribution analysis page. It is currently populated with dummy data.

In the top left is the folder level contribution pie chart.

In the bottom left is a placeholder timeline graph. The timeline is yet to be designed, so this is just a placeholder.

In the top right you will see contribution bars for each file in the folder.
