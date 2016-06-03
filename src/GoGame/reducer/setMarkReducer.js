import _ from 'lodash';

// Return a new board after applying the given action, which is assumed to be a setMark() action.
// Coordinates in the action are 1 indexed (from 1 to 19, as in real life).
function setMarkReducer(board, action) {
  // convert to internal 0-indexed coordinates
  const i = action.i - 1;
  const j = action.j - 1;

  const newBoard = _.clone(board);
  newBoard[i] = _.clone(board[i]);
  newBoard[i][j] = { ...board[i][j], mark: action.mark };

  return newBoard;
}

export default setMarkReducer;
