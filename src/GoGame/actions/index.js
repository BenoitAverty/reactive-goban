
const init = () => ({ type: undefined });

const playMove = (i, j) => ({
  type: 'PLAY_MOVE',
  i,
  j,
});

const pass = () => ({
  type: 'PASS',
});

export default {
  init,
  playMove,
  pass,
};
