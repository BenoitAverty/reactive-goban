import _ from 'lodash';
import deepFreeze from 'deep-freeze';

import playMoveReducer from './playMoveReducer';
import setMarkReducer from './setMarkReducer';

const initialGame = {
  board: _.map(Array(19), () => _.fill(Array(19), {})),
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
        moves: _.concat(game.moves, {}),
        actions: _.concat(game.actions, { status: 'SUCCESS', action }),
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
