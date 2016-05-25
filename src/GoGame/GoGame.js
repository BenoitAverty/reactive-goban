function GoGame() {
  this.board = {
    4: { 4: {}, 10: {}, 16: {} },
    10: { 4: {}, 10: {}, 16: {} },
    16: { 4: {}, 10: {}, 16: {} },
  };
  this.moves = [];
  this.ko = null;
}

GoGame.prototype = {};

export default GoGame;
