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
// be returned. Pass null explicitely to return only empty intersections.
// Does not return the indices of empty intersections.
export function adjacentStones({ i, j }, board, onlyColor) {
  const intersectionIsInGoban = coord => coord.i >= 0 && coord.j >= 0 && coord.i < 19 && coord.j < 19;
  const intersectionIsEmpty = coord =>
    board[coord.i][coord.j].stone === undefined ||
    board[coord.i][coord.j].stone === null;
  const intersectionIsNotEmpty = coord => !intersectionIsEmpty(coord);
  const stoneHasRightColor = coord => onlyColor === board[coord.i][coord.j].stone;

  const neighbours = [{ i, j: j-1 }, { i: i-1, j }, { i: i+1, j }, { i, j: j+1 }]
    .filter(intersectionIsInGoban);
  if (onlyColor === undefined) {
    return neighbours.filter(intersectionIsNotEmpty);
  }
  else if (onlyColor === null) {
    return neighbours.filter(intersectionIsEmpty);
  }
  else {
    return neighbours.filter(intersectionIsNotEmpty).filter(stoneHasRightColor);
  }
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

// Return the number of liberties of the stone or group at coordinates i, j (0-indexed)
export function groupLiberties({ i, j }, board) {
  const group = stoneGroup({ i, j }, board);
  const liberties = [];
  _.forEach(group, (s) => {
    liberties.push(...adjacentStones({ i: s.i, j: s.j }, board, null));
  });

  return _.uniqWith(liberties, _.isEqual).length;
}
