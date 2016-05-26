import React from 'react';
import ReactDom from 'react-dom';

import { GoGame, ReactGoban, goGameReducer, actions } from '../src';

let game = new GoGame();
game = goGameReducer(game, actions.playMove(3, 3));
game = goGameReducer(game, actions.playMove(16, 16));
game = goGameReducer(game, actions.playMove(19, 19));

function handleClick(i, j) {
  game = goGameReducer(game, actions.playMove(i, j));
  renderBoard(game.board); // eslint-disable-line no-use-before-define
}

function renderBoard(board) {
  ReactDom.render(
    <ReactGoban board={board} onIntersectionClick={handleClick} />,
    document.getElementById('app')
  );
}

renderBoard(game.board);
