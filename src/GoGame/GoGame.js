import _forOwn from 'lodash/forOwn';

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
};

_forOwn(actions, (actionCreator, actionName) => {
  if (actionName !== 'init') {
    GoGame.prototype[actionName] = function goGameShortcutMethod(...args) {
      return new GoGame(goGameReducer(this, actionCreator(...args)));
    };
  }
});

export default GoGame;
