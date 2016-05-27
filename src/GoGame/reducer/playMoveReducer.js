import _ from 'lodash';

// Returns true if playing on the given coordinates (between 0 and 18) is a valid move.
function moveValidity({ i, j }, board) {
  if (i < 0 || i > 18 || j < 0 || j > 18) {
    return { valid: false, reason: 'OUTSIDE_BOARD' };
  }

  if (board[i][j].stone !== undefined && board[i][j].stone !== null) {
    return { valid: false, reason: 'EXISTING_STONE' };
  }

  return { valid: true };
}

// Return the coordinates of the stones adjacent to the given indices.
// indices are assumed to be between 0 and 18 (real indices of the board array).
// Optional parameter 'onlyColor' is used to specify if only the stones of the given color are to
// be returned.
// Does not return the indices of empty intersections.
function adjacentStones({ i, j }, board, onlyColor) {
  const stoneFilter = coord =>
    board[coord.i][coord.j] !== undefined &&
    board[coord.i][coord.j] !== null &&
    board[coord.i][coord.j].stone !== undefined &&
    board[coord.i][coord.j].stone !== null &&
    (onlyColor !== undefined ? board[coord.i][coord.j].stone === onlyColor : true);

  return _.filter([{ i, j: j-1 }, { i: i-1, j }, { i: i+1, j }, { i, j: j+1 }], stoneFilter);
}

// Return a list of all the indices in the board that belong to the same group as the given indices.
// Indices are assumed to be between 0 and 18 (real indices of the board array).
// If the given intersection is empty, returns an empty list.
// function stoneGroup({ i, j }, board) {
//   if(board[i][j].stone === undefined || board[i][j] === null) {
//     return [];
//   }
//
//   let group = [{ i, j }, ...adjacentStones({ i, j }, board, board[i][j].stone)];
//   let otherGroup = _.concat(group);
//
//   do {
//     _.forEach(otherGroup, (coord) => _.concat(group))
//   } while (_.isEqual(group, otherGroup));
// }

// Return a new game after applying the given action, which is assumed to be a playMove() action.
// Coordinates in the action are 1 indexed (from 1 to 19, as in real life).
function playMoveReducer(game, action) {
  const i = action.i - 1;
  const j = action.j - 1;
  const turn = (game.moves.length % 2 === 0) ? 'BLACK' : 'WHITE';

  const validity = moveValidity({ i, j }, game.board);
  if (validity.valid) {
    const newMoves = _.concat(game.moves, { i: i+1, j: j+1 });

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
