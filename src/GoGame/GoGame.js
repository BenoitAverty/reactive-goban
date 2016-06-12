import goGameReducer from './reducer';
import actions from './actions';

// Create a GoGame object using the reducer. If the 'game' param is
// undefined, the reducer will use the initial state.
function GoGame(game) {
  Object.assign(this, goGameReducer(game, actions.init()));
}


GoGame.prototype = {
  get ko() {
    return this.koCoordinates !== undefined && this.koCoordinates !== null;
  },
  get lastAction() {
    return this.actions[this.actions.length-1] || null;
  },
  get turn() {
    return this.moves.length % 2 === 0 ? 'BLACK' : 'WHITE';
  },
};

export default GoGame;
