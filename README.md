Drive Tracker
---

**ScrumMasters**

Ellen Anastasia elle0001,
Erica Son eson0001,
Hoang Phan hpha0005,
Kenny Ye kyee0003,
Marc Porciuncula mpor14,
Fenghe Shen fshe17

### Instructions for client review

Read the file `documents/Client-Review.md` for instructions.

### How to view the project.

#### Visit production site

See the latest deployment live at [https://drive-tracker.now.sh](). The master branch is deployed at the end of every sprint.

#### Run the webserver locally

Complete the following:
- Project setup
  - Set up your developement environment
    - Install Node.js
    - Update npm
- Install project dependencies
- Run the development server 

Read below for instructions.

### Project setup

#### Set up your development environment

##### Install Node.js

You need Node.js 10.9.0 or later. Download and follow the instructions to install. This will also install the npm package manager.

- [Node.js](https://nodejs.org/en/)

##### Update npm

Make sure your npm is up to date. Run the following in your terminal.

```
npm install -g npm
```

##### Install an editor and extensions (Optional)

It is recommended you use either the VSCode or Atom code editors, as they have the best tooling available for this project.

- VSCode
  - [Vue Language Support](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Atom
  - [Vue Language Support](https://atom.io/packages/language-vue)
  - [Prettier](https://atom.io/packages/prettier-atom)
  - [Eslint](https://atom.io/packages/linter-eslint)

##### Install the Vue DevTools Browser Extension (Optional)

Vue provides browser extensions for inspecting Vue components during development.

- [Vue DevTools](https://github.com/vuejs/vue-devtools)

#### Install project dependencies

Run the following command to download and install dependencies. This may take several minutes the first time.

```
npm install
```

You should run this command every time you checkout a new branch in case the dependencies have changed.

### Run the development server

```
npm run serve
```

Then visit the url provided in your browser.

### Lint and format files

```
npm run lint
```

This will also be automatically run for you when you try to commit. You must fix any linting errors before you can commit.

It is recommended you install the editor plugins mentioned above and enable format/lint on save.

### Compile the site for deployment

```
npm run build
```

### Deploy

#### Install Now CLI

```
npm install -g now
```

#### Create a deployment

```
now
```

#### Alias the deployment 

> Note only the owner of a given url can alias to it.

```
now alias drive-tracker.now.sh
```

