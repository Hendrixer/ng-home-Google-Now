 ng-Home (Google Now theme)
==================

Beautiful home apps for developers using Angular (Google Now theme)
-------------------------------------------------------------------------------------------------

### Stack
- [Angular](http://angularjs.org)
- [Node](http://nodejs.org)
- [Express](http://expressjs.com)
- [Mongo](http://mongodb.org)
- [Socket.io](http://socket.io/)
- [Stylus](http://learnboost.github.io/stylus/)
- [Gulp](https://github.com/gulpjs/gulp)

### Purpose
**ng-Home** was created to be a starting point for developers to build an awesome personal / portfolio app. If you're cool with a hacker news or craigslist themed, or should I say non-themed, personal site, then this is not for you. This is for the developers that crave style and shiny things.

### Theme
This theme draws inspiration from **Google Now** on Android and **Google Search** on iOS. Using the search bar at the top of the page, users can search for information about a developer. In formation is formatted and placed on 'cards' that enter and leave the page based on what is being searched. Animations are smooth. Ng-Home is mobile friendly.

### Usage
ng-Home uses **Gulp** as a task runner

1. Install globals if you don't have them yet
  * `sudo npm install -g bower gulp mocha`
2. Install dependencies
  * `npm install`
  * `package.json` has a _postinstall_ that will run `bower install` after npm is done installing
3. env Variables
  * You must export the following variables for 3rd Party API integration
  * `exports TWITTER_HANDLE=` your twitter handle minus '@'
  * `exports TWITTER_API_KEY=` your twitter api key
  * `exports TWITER_API_SECRET=` your twitter api secret
  * `exports TWITTER_ACCESS_TOKEN=` your twitter access token
  * `exports TWITTER_ACCESS_SECRET=` your twitter access secret
4. Booting up
  * Gulp will runt all test, start live-reload server, concat and lint client scripts, then load api server with nodemon. Al this is set to go but just running `gulp`





