
const init = () => ({ type: undefined });

const playMove = (i, j) => ({
  type: 'PLAY_MOVE',
  i,
  j,
});

export default {
  init,
  playMove,
};
