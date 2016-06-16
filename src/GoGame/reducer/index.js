import _map from 'lodash/map';
import deepFreeze from 'deep-freeze';

import playMoveReducer from './playMoveReducer';
import setMarkReducer from './setMarkReducer';

const initialGame = {
  board: _map(Array(19), () => _map(Array(19), () => ({}))),
  moves: [],
  koCoordinates: null,
  actions: [],
};

const goGameReducer = (game = initialGame, action) => {
  let resultGame;

  switch (action.type) {
    case 'PASS':
      resultGame = {
        ...game,
        moves: game.moves.concat({}),
        actions: game.actions.concat({ status: 'SUCCESS', action }),
      };
      break;
    case 'PLAY_MOVE':
      resultGame = playMoveReducer(game, action);
      break;
    case 'SET_MARK':
      resultGame = {
        ...game,
        board: setMarkReducer(game.board, action),
      };
      break;
    default:
      resultGame = game;
  }

  deepFreeze(resultGame);
  return resultGame;
};

export default goGameReducer;
