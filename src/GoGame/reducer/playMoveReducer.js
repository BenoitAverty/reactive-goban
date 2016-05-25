import _ from 'lodash';

import GoGame from '../GoGame';

const playMoveReducer = (game, action) => {
  const newMoves = _.concat(game.moves, { i: action.i, j: action.j });
  const newTurn = game.turn === 'WHITE' ? 'BLACK': 'WHITE';

  return Object.assign(
    new GoGame(),
    {
      moves: newMoves,
      turn: newTurn,
    }
  );
};

export default playMoveReducer;
