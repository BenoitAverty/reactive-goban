import _ from 'lodash';

const getMoveValidity = ({ i, j }, board) => {
  if (i < 1 || i > 19 || j < 1 || j > 19) {
    return { valid: false, reason: 'OUTSIDE_BOARD' };
  }

  if (board[i-1][j-1].stone !== undefined && board[i-1][j-1].stone !== null) {
    return { valid: false, reason: 'EXISTING_STONE' };
  }

  return { valid: true };
};

const playMoveReducer = (game, action) => {
  const i = action.i;
  const j = action.j;
  const turn = (game.moves.length % 2 === 0) ? 'BLACK' : 'WHITE';

  const moveValidity = getMoveValidity({ i, j }, game.board);
  if (moveValidity.valid) {
    const newMoves = _.concat(game.moves, { i, j });

    const newBoard = _.clone(game.board);
    newBoard[i-1] = _.clone(game.board[i-1]);
    newBoard[i-1][j-1] = Object.assign({}, game.board[i-1][j-1], { stone: turn });

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
      reason: moveValidity.reason,
      action,
    });

    return { ...game, actions: newActions };
  }
};

export default playMoveReducer;
