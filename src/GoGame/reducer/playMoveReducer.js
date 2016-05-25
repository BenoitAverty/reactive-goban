import _ from 'lodash';

import GoGame from '../GoGame';

const playMoveReducer = (game, action) => {
  const newMoves = _.concat(game.moves, { i: action.i, j: action.j });

  return Object.assign(
    new GoGame(),
    {
      moves: newMoves,
    }
  );
};

export default playMoveReducer;
