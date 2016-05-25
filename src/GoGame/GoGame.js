function GoGame() {
  this.board = {};

  this.moves = [];

  this.ko = false;
  this.koCoordinates = null;

  this.actions = [];
  this.lastAction = null;

  this.turn = 'BLACK';
}

GoGame.prototype = {};

export default GoGame;
