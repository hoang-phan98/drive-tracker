Analysis of Alternatives
---
Scrum Masters

Kenny Ye, Hoang Phan, Erica Son, Marc Porciuncula, Ellen Anastasia, Fenghe Shen

---
- Introduction
- Platform
- Language
- Libraries/Frameworks
  - Client Web Application Framework
  - UI Framework
  - Charting Library

# Introduction
This report contains investigations, comparisons, and final decisions made on the technical alternatives available to us for the development of Drive Tracker.

We have investigated and made decisions on alternatives for the following:
- Platform
- Programming Language
- Application Framework
- UI Framework
- Graph/Chart Drawing Framework


# Platform
The platform determines what kinds of device/context our application can be used in. 

## Terms of reference
The criteria for selecting a platform are:

- The application should be easily accessible, as it is a companion to Google Drive which is also accessible and widely used.
- Markers/team members should be able to fit the app easily into their workflow.
- Google Drive is used continuously in work contexts, the application should be easily maintainable for a long lifetime.
- Development costs should be minimised as the project has a low budget.
- The team will be more effective working with a platform they are already familiar with.

## Alternatives Investigated
- Native iOS or Native Android App
- React Native iOS/Android App
- Native Windows or Native Mac Application
- Web Application

### Native iOS or Native Android App
- The app would be available on iOS or Android, alongside Google’s own Google Drive apps.
- The app must be downloaded and installed from the Apple App Store or Google Play Store.
- Mobile apps are portable and convenient.
- The app would not be accessible from laptop/desktop, where Google Drive is most used.
- Mobile OS fragmentation leads to further issues around OS version support as well as upgrade work when new OS versions come out.
- Developers must pay a fee to develop for iOS.
- Developers would need their own iOS or Android device for testing.
- Our developers have some experience with Java.

### React Native iOS/Android App
- The points from Native iOS or Native Android App also apply, with the exception of:
- iOS and Android app can be developed simultaneously from one codebase.
- Uses the React framework for JavaScript, some of our developers have experience with JavaScript.
- Java and C#/Swift may be needed to access certain APIs.

### Native Windows or Native Mac Application
- The application would be available on Mac or Windows.
- The application would have to be downloaded and installed.
- The app would be accessible from laptop/desktop, where Google Drive is most used.
- Native Mac/Native Windows APIs change very rarely across OS updates, but would require upgrade work.
- Our developers have little experience making Native Mac/Native Windows GUI applications.

### Web Application
- Accessible to anyone with a recent browser across operating systems and device types.
- Google Drive is predominantly a laptop/desktop web app so users will likely already have a browser open in their workflow.
- An internet connection is required whenever the app is accessed.
- Web apps require no download or install step, no need to push updates to an app store.
- The web platform is entirely backwards compatible.
- There may be costs for web hosting.
- Our developers have moderate to high experience with web development and required languages.

## Recommendation
Developing a Web Application appears to best meet our selection criteria. It provides the greatest accessibility and, being the same nature as Google Drive, it easily fits into the workflows of our users. There is is likely to be much less maintenance work than a mobile or desktop native application. Our developers have experience with JavaScript which will make us more effective when building the product. Although there could be costs for web hosting, we would likely have been similar costs in hosting backend services for all platform types.

# Language
The language determines what libraries/frameworks will be available to us. Our developers’ familiarity with the language will affect the time needed to develop.

## Terms of reference
The criteria for selecting a language are:

- Ability to do client side (browser) scripting
- Capabilities as a web server
- Team familiarity and/or ease of learning
- Ability to generate graphics/charts
- Access to the Google Drive API

## Alternatives Investigated
- JavaScript
- Python
- Java

### JavaScript
- The most mature client scripting language, and the only browser native language (there are languages that compile to JavaScript).
- Node.js is a JavaScript runtime for the server. Although newer than other languages, it’s modern, popular, and well supported/maintained/developed.
- Most of the team has used client side JavaScript.
- Due to its popularity and widespread use there are many of free learning resources - available online. 
- We can use the same language for the server and client, which is better for development.
- The package manager for node, npm, hosts many open source, actively maintained libraries that could save on work.
- Graphics can be drawn client side.
- Google provides Google Drive API libraries for the browser and Node.js

### Python
- Can only be used for the server.
- There are mature web server frameworks available eg. Django, Tornado.
- Most of the team has experience with Python for general programming but not for web development.
- Graphics can be drawn server side then served as an image.
- Google provides Google Drive API libraries for Python.

### Java
- Can only be used for the server.
- There are mature web server frameworks available eg. Spring.
- Most of the team has experience with Java for general programming but not web development.
- Graphics can be drawn server side then served as an image.
- Google provides Google Drive API libraries for Java.

## Recommendation
Writing the application in JavaScript appears to best meet our selection criteria. It is the only language that can be used to do client scripting. All options are capable for writing a web server, but using JavaScript with Node.js for the web server comes with the added benefit of using only a single language. There is the possibility of writing a server only web application, but the capabilities are more limited. The popularity of JavaScript and the existing experience of our developers means that JavaScript will likely increase our productivity. Being able to draw graphs/charts on the client side gives us more flexibility, for example to change the charts dynamically without reloading the page. There are Google Drive API libraries available for JavaScript.

# Library/Frameworks
The libraries/frameworks chosen affect the amount of work that needs to be done to achieve usable features. We have done shorter investigations on the libraries/frameworks as they have less impact than the platform and language.

Note we are only considering free, open source libraries to satisfy budget constraints.

# Client Web Application Frameworks
The choice of client web application framework affects how the application code will be organised, and by extension how work is split as well as the speed of development.

## Terms of Reference
The criteria for selecting a client web application framework are:

- Support and existing production use (so we know its stable and low risk)
- Ease of use for developers
- Impact on architecture/separation of work.

## Alternatives Investigated
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)
- Vanilla JavaScript (no framework)

### React
- Popular and well supported, in widespread production use
- Sharp learning curve
- Work can be split by component

### Vue
- Popular and well supported, in slightly less widespread production use
- Somewhat shallower learning curve
- Work can be split by component

### Vanilla JavaScript (no framework)
- There is not much extra to learn, developers should already be familiar with browser APIs
- Hard to keep organised, gets more complicated as the project grows larger
- Have to make up our own structure to split the work

## Recommendation
We choose Vue as it has the architectural benefits of a framework, is in production use so it has low risk. Furthermore it is less difficult to learn than React.

# UI Frameworks
The choice of UI framework affects the speed of development and the appearance and accessibility of the resulting app.

## Terms of Reference
The criteria for selecting a UI framework are:

- Support and existing production use (so we know its stable and low risk)
- Ease of use for developers
- Appearance and customizability

## Alternatives Investigated
- [Bootstrap](https://getbootstrap.com/)
- [Material Components Web](https://github.com/material-components/material-components-web/)
- From scratch (no framework)

### Bootstrap
- Popular and well supported, in widespread production use
- Simple to use with heavy documentation
- Good appearance but can look similar to other Bootstrap sites.

### Material Components Web
- Newer and less popularly used than Bootstrap
- Can be somewhat fiddly to integrate into own project
- Very good appearance, Material Design is consistent with Google Drive.

### From scratch (no framework)
- More work than using a framework
- Developers should already be familiar with making ui from scratch
- Most customizable but more time needs to be spent to reach a good appearance.

## Recommendation
We choose Bootstrap as it is popularly used in production and easy to make use of. Working from scratch would take a lot more work and slow our productivity.


# Charting Library
The choice of charting library affects the speed of development and the appearance of the resulting app.

## Terms of Reference
The criteria for selecting a charting library are:

- Support and existing production use (so we know its stable and low risk)
- Ease of use for developers
- Appearance and customizability

## Alternatives Investigated
- [D3.js](https://d3js.org/)
- [Google Charts API](https://developers.google.com/chart/)
- From scratch (no framework)

### D3.js
- Popular and well supported, in widespread production use
- Somewhat steep learning curve
- Not great appearance to start but very customizable and therefore has potential for good appearance.

### Google Charts API
- Provided by and used by Google, so in heavy production use and well supported.
- Quick to start, simple to use.
- Only a limited range of chart options and customisations available.

### From scratch (no framework)
- Much more difficult and more work than using a framework.
- Best customizability at the cost of extra work.

## Recommendation
We choose Google Charts API with a fallback to D3.js. The work needed to create charts from scratch is not feasible for this project. The Google Charts API the the easiest to start with, but once we need more complex customisations we can start to use D3.js.
