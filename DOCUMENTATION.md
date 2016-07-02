# API Documentation

This is a complete documentation of the public API of each object. If a method, function and object is not written here, you can consider it internal implementation and it may change at any time in a future release.

- [**actions**](#actions)
- [**goGameReducer function**](#gogamereducer-function)
- [**GoGame constructor function**](#gogame-constructor-function)
- [**ReactGoban component**](#reactgoban-component)
- [**CycleGoban component**](#cyclegoban-component)
- [**appendix : GoGame object shape**](#appendix--gogame-object-shape)


## actions
The actions object contains several methods that are action creators. These methods are useful to construc action objects to pass to the reducer.

 - ***actions.init() : action object***

 Create a dummy action. The reducer won't do anything when receiving this action and only return the same game object. Useful to make the reducer return its default game object.

 - ***actions.playMove(i: Number, j: Number) : action object***

Create an action that represents a move being played on the board at row i and column j. The top-left intersection is at coordinates i=1, j=1 and the bottom-right intersection is at coordinates i=19, j=19.

 - ***actions.pass() : action object***

Create an action that represents a "pass" from a player.

 - ***actions.setMark(coordinates : Object, mark: String) : action object***

Create an action that will set a mark on the board. the ```coordinates``` object must have properties i (row) and j (column) to represent where the mark will be set.

The ```mark``` parameter represents which mark will be set. Il can be any string : a one character mark will be displayed on the board, the others will become a css class useful for rendering the goban (see CycleGoban and ReactGoban). Default mark is "cross".

## goGameReducer function

The goGameReducer contains all the business logic of the library. It is responsible to build a new object based on a previous object and an action.

***goGameReducer(game : game Object, action : action object) : game Object***.

The returned object is immutable, and is not an instance of the GoGame constructor function.

In all cases, an object is added at the end of the game.actions property (a list). This object contains an `action` property that contains the action that was passed to the reducer, a `status` property ('SUCCESS' or 'FAILURE'), and a `reason` property (if the status is failure).

Here are all the transformations made for each action:

- With a "playMove" action: Adds an object at the end of the `moves` property with the coordinates of the move (if successful). If there are captures, they are present in the last `action` object. The `board` object is also modified according to the move.
- With a "pass" action: Adds an empty object in the `moves` property.
- With a "setMark" action: Modifies the board to set a mark ath the coordinates specified. The mark can be a string or a single character. If it's a string, it'll be stripped of any special chars, set to lower case and it will be trimmed. If it's a single character, it will be trimmed (cannot be a blank char) but no other transformation will be applied.
- With an "init" action: The game parameter of the object is returned as is (same reference).

## GoGame constructor function

## ReactGoban component

## CycleGoban component

## appendix : GoGame object shape

You may want to manipulate GoGame objects (or objects returned by the reducer) directly. Here is the shape of this object for reference. Not that it may change at any time.

The example object is displayed after there has been a move played on coordinate 3,3 and a mark set on coordinate 3,4

```javascript
const game = {
  actions: [],
  moves: [],
  board: [
    [{}, {}, {}, ...], // 19 empty objects
    [{}, {}, {}, ...],
    [{}, {}, { stone: 'BLACK' }, { mark: 'cross' }, ...],
    [{}, {}, {}, ...],
    ...
  ] // 19 rows
}
```
