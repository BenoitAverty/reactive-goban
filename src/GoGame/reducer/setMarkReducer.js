import slug from 'slug';

delete slug.charmap.$;

// Return a new board after applying the given action, which is assumed to be a setMark() action.
// Coordinates in the action are 1 indexed (from 1 to 19, as in real life).
function setMarkReducer(board, action) {
  // convert to internal 0-indexed coordinates
  const i = action.i - 1;
  const j = action.j - 1;

  if (typeof action.mark !== 'string') {
    return board;
  }

  const mark = action.mark.trim() || 'cross';

  const newBoard = [...board];
  newBoard[i] = [...board[i]];

  if (mark.length === 1) {
    newBoard[i][j] = { ...board[i][j], mark };
  }
  else {
    newBoard[i][j] = { ...board[i][j], mark: slug(mark).toLowerCase() };
  }

  return newBoard;
}

export default setMarkReducer;
