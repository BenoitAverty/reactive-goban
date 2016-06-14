import _uniqWith from 'lodash/uniqWith';
import _isEqual from 'lodash/isEqual';

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
// parameter 'color' is used to specify the color of the stones to be returned.
// Pass null explicitely to return only empty intersections.
// Does not return the indices of empty intersections unless the color parameter is set to null.
export function adjacentStones({ i, j }, board, color) {
  const coordIsInGoban = coord => coord.i >= 0 && coord.j >= 0 && coord.i < 19 && coord.j < 19;
  const intersectionIsEmpty = coord =>
    board[coord.i][coord.j].stone === undefined ||
    board[coord.i][coord.j].stone === null;
  const intersectionIsNotEmpty = coord => !intersectionIsEmpty(coord);
  const stoneHasRightColor = coord => color === board[coord.i][coord.j].stone;

  const neighbours = [{ i, j: j-1 }, { i: i-1, j }, { i: i+1, j }, { i, j: j+1 }]
    .filter(coordIsInGoban);
  if (color === null) {
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
      group2.forEach(addToGroup1);
      group1 = _uniqWith(group1, _isEqual);
    }
    else {
      group1.forEach(addToGroup2);
      group2 = _uniqWith(group2, _isEqual);
    }
  }

  return group1;
}

// Return the number of liberties of the stone or group at coordinates i, j (0-indexed)
export function groupLiberties({ i, j }, board) {
  const group = stoneGroup({ i, j }, board);
  const liberties = [];
  group.forEach((s) => {
    liberties.push(...adjacentStones({ i: s.i, j: s.j }, board, null));
  });

  return _uniqWith(liberties, _isEqual).length;
}
