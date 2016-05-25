import _ from 'lodash';

import goGameReducer from './reducer';
import actions from './actions';

function GoGame() {
  Object.assign(this, goGameReducer(undefined, actions.init()));
}

GoGame.prototype = {
  get ko() {
    return this.koCoordinates !== undefined && this.koCoordinates !== null;
  },
  get lastAction() {
    return _.last(this.actions) || null;
  },
  get turn() {
    return this.moves.length % 2 === 0 ? 'BLACK' : 'WHITE';
  },
};

export default GoGame;
