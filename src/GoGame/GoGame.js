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
    return 'BLACK';
  },
  playMove({ i, j }) {
    return goGameReducer(this, actions.playMove(i, j));
  },
};

export default GoGame;
