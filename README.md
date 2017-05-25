# SmythsUi
Smyths Ui is a simple angular-cli web app that acts as the front end for the [smyths spring boot project](https://github.com/SimonFM/smyths). It simply creates requests for the backend server and handles the creation of the graphs and user interaction with my Cataloguing Smyths API.

This is a personal project to help me learn more about the world of angular and is not ~~yet~~ intended for public use.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

### Features so far.
* Searching (stupid search)
* Locations 
* Displaying products

### Planned Features.
* Graphing of item prices to show distribution over time
  * Filtering intevals by date, price.
  * Allowing for different styles of graphs
* Users ~~Ugh~~ Yay!
  * Logins
  * Favourites
  * Item alerts
* Smarter Search
  * Research Algorithms
  * Improve Database querying
* Migrate from POSTGIS to something more kotlin friendly (it's awkward to use)
* Make a docker instance 

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
