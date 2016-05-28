import _ from 'lodash';

import { moveValidity } from '../gobanUtils';

// Return a new game after applying the given action, which is assumed to be a playMove() action.
// Coordinates in the action are 1 indexed (from 1 to 19, as in real life).
function playMoveReducer(game, action) {
  // convert to internal 0-indexed coordinates
  const i = action.i - 1;
  const j = action.j - 1;

  const turn = (game.moves.length % 2 === 0) ? 'BLACK' : 'WHITE';

  const validity = moveValidity({ i, j }, game.board);
  if (validity.valid) {
    const newMoves = _.concat(game.moves, { i: action.i, j: action.j });

    const newBoard = _.clone(game.board);
    newBoard[i] = _.clone(game.board[i]);
    newBoard[i][j] = { ...game.board[i][j], stone: turn };

    const newActions = _.concat(game.actions, { status: 'SUCCESS', action });

    return {
      ...game,
      board: newBoard,
      moves: newMoves,
      actions: newActions,
    };
  }
  else {
    const newActions = _.concat(game.actions, {
      status: 'FAILURE',
      reason: validity.reason,
      action,
    });

    return { ...game, actions: newActions };
  }
}

export default playMoveReducer;
