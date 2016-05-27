import _ from 'lodash';
import deepFreeze from 'deep-freeze';

import playMoveReducer from './playMoveReducer';

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
      resultGame = { ...game, moves: _.concat(game.moves, {}) };
      break;
    case 'PLAY_MOVE':
      resultGame = playMoveReducer(game, action);
      break;
    default:
      resultGame = game;
  }

  deepFreeze(resultGame);
  return resultGame;
};

export default goGameReducer;
