# reactive-goban

A Javascript object representation of a Go Game, and several solutions to render it in the browser.

[![Travis](https://img.shields.io/travis/BenoitAverty/reactive-goban/master.svg)](https://travis-ci.org/BenoitAverty/reactive-goban)
[![Codecov](https://img.shields.io/codecov/c/github/BenoitAverty/reactive-goban.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/github/BenoitAverty/reactive-goban.svg)](https://codeclimate.com/github/BenoitAverty/reactive-goban)
[![npm](https://img.shields.io/npm/v/reactive-goban.svg)](https://npmjs.com/package/reactive-goban)

## Disclaimer

The library is in prerelease and in heavy development. Expect breaking changes and bugs until the 1.0.0 version is published.

## Motivation

## Installation

The library is available as a npm package :

    npm install reactive-goban --save

If you're not using npm, a bundle is also available. You can get it on npmcdn :

    <script type="text/javascript" src="http://npmcdn.com/reactive-goban/dist/reactive-goban.js"></script>

or in minified version :

    <script type="text/javascript" src="http://npmcdn.com/reactive-goban/dist/reactive-goban.min.js"></script>

both version allow for a specific version (especially advised if you use the cdn in production) :

    npm install reactive-goban@0.2.0 --save
    <script type="text/javascript" src="http://npmcdn.com/reactive-goban@0.2.0/dist/reactive-goban.min.js"></script>

## Usage

The library exports several objects (see relevant sections for details about what they are):
 - GoGame (constructor function)
 - goGameReducer (function)
 - actions (object of functions)
 - ReactGoban (React component)
 - CycleGoban (CycleJS component)

The basics are shown below. For more details, check out the [documentation](https://github.com/BenoitAverty/reactive-goban/blob/master/DOCUMENTATION.md) or the [examples](https://github.com/BenoitAverty/reactive-goban/blob/master/examples).

### The GoGame object
```javascript
var GoGame = require('reactive-goban').GoGame; // CommonJS
const { GoGame } = require('reactiveGoban'); // CommonJS with ES6
import { GoGame } from 'reactive-goban'; // ES6 module
var GoGame = reactiveGoban.GoGame; // in the browser with script tag
```

The GoGame object is meant to provide the most classical javascript experience to manipulate a game of Go. You can use the GoGame() constructor function to create an object, and call methods directly on this object, Object Oriented Programming style. It is probably the simplest way to use the library if you're not familiar with modern frameworks like React or CycleJS.

```javascript
var game = new GoGame(); // Create an immutable game object.
game = game.playMove(3, 3); // Black plays on the top-left san-san.
game = game.playMove(16,16); // White plays on the bottom-right hoshi.
game = game.pass(); // Black passes
game = game.setMark({ i: 3; j: 3 }, 'cross'); // Set the cross mark on the top-left san-san.
game.turn() // Returns 'WHITE'
```

See the documentation for the complete information on each method.

There is currently no way to render the GoGame object directly. You'll have to use React or code your own way of rendering the board. If you feel there should be a way to render a GoGame object without react, feel free to file an issue or submit a pull request.

### Reducer and Actions (Redux or similar paradigm)
```javascript
var goGameReducer = require('reactive-goban').goGameReducer; var actions = require('reactive-goban').actions; // CommonJS
const { goGameReducer, actions } = require('reactiveGoban'); // CommonJS with ES6
import { goGameReducer, actions } from 'reactive-goban'; // ES6 module
var goGameReducer = reactiveGoban.goGameReducer; var actions = reactiveGoban.actions; // in the browser with script tag
```
Under the hood, the GoGame object uses a reducer and actions (each method that returns a new GoGame object corresponds to one action). If you use Redux, Functional or Reactive Programming (with RxJS for example), you'll probably want to use the reducer and actions directly, so they are available publicly.

```javascript
var game = goGameReducer(undefined, actions.init()) // create a new game
var game = goGameReducer(game, actions.playMove(3,3)) // Black plays on the top-left san-san
var actionsArray = [
  actions.init()
  actions.playMove(3, 3),
  actions.playMove(16, 16),
  actions.playMove(4, 16), // top-right hoshi
  actions.pass(),
  actions.setMark({ i: 3, j: 3}, 'A'),
]
var otherGame = actionsArray.reduce(goGameReducer, undefined);
```

### Rendering with the React component
```javascript
var ReactGoban = require('reactive-goban').ReactGoban; // CommonJS
const { ReactGoban } = require('reactiveGoban'); // CommonJS with ES6
import { ReactGoban } from 'reactive-goban'; // ES6 module
var ReactGoban = reactiveGoban.ReactGoban; // in the browser with script tag
```

The React component provided is able to render a GoGame object or the result of the goGameReducer. Note that it only renders HTML so you'll have to do the styling yourself (although a CSS stylesheet is available [in the examples](https://github.com/BenoitAverty/reactive-goban/blob/master/examples/react-goban-example.css) , but it may not fit your expectations :) ).

```javascript
let game = goGameReducer(undefined, actions.init()); // or const game = new GoGame();

function handleClick(i, j) {
  // do something, and probably re-render the component :)
}

ReactDom.render(
  <ReactGoban board={game.board} onIntersectionClick={handleClick} />,
  document.getElementById('app')
);
```

### With RxJS and CycleJS
```javascript
var CycleGoban = require('reactive-goban').CycleGoban; var gobanClicks = require('reactive-goban').gobanClicks; // CommonJS
const { CycleGoban, gobanClicks } = require('reactiveGoban'); // CommonJS with ES6
import { CycleGoban, gobanClicks } from 'reactive-goban'; // ES6 module
var CycleGoban = reactiveGoban.CycleGoban; var gobanClicks = reactiveGoban.gobanClicks; // in the browser with script tag
```

The CycleGoban component is a CycleJS component, which take as source a RxJS Observable of game objects (result of the reducer most likely) called games$ and returns in the DOM sink an Observable of hyperscript vtrees representing the goban. Pass this Observable to the DOM driver and you'll have the same result as the React component.

Additionally, the function "gobanClicks" takes the DOM source from CycleJS's DOM driver and returns an Observable of click events on the goban with their coordinates.

```javascript
function main({ DOM }) {
  const games$ = gobanClicks(DOM)
    .map({ i, j } => actions.playMove(i,j))
    .startWith(actions.init())
    .scan(goGameReducer, undefined);

  const gobanVtrees$ = CycleGoban(actions).DOM;

  return {
    DOM: gobanVtrees$,
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
});
```

## Documentation

The full documentation of the public API is available [here](https://github.com/BenoitAverty/reactive-goban/blob/master/DOCUMENTATION.md)
