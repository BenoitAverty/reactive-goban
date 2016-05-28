import _ from 'lodash';

// Returns true if playing on the given coordinates (between 0 and 18) is a valid move.
export function moveValidity({ i, j }, board) {
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
export function adjacentStones({ i, j }, board, onlyColor) {
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
export function stoneGroup({ i, j }, board) {
  if (board[i][j].stone === undefined || board[i][j] === null) {
    return [];
  }

  const groupColor = board[i][j].stone;

  let group1 = [{ i, j }];
  let group2 = [{ i, j }, ...adjacentStones({ i, j }, board, groupColor)];

  const addToGroup1 = coord => {
    group1.push(...adjacentStones(coord, board, groupColor));
  };
  const addToGroup2 = coord => {
    group2.push(...adjacentStones(coord, board, groupColor));
  };

  while (group1.length !== group2.length) {
    if (group1.length < group2.length) {
      _.forEach(group2, addToGroup1);
      group1 = _.uniqWith(group1, _.isEqual);
    }
    else {
      _.forEach(group1, addToGroup2);
      group2 = _.uniqWith(group2, _.isEqual);
    }
  }

  return group1;
}
