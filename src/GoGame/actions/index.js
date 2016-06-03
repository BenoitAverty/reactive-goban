
const init = () => ({ type: undefined });

const playMove = (i, j) => ({
  type: 'PLAY_MOVE',
  i,
  j,
});

const pass = () => ({
  type: 'PASS',
});

const setMark = ({ i, j }, mark = 'X') => ({
  type: 'SET_MARK',
  i,
  j,
  mark,
});

export default {
  init,
  playMove,
  pass,
  setMark,
};
