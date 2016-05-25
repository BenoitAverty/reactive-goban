import GoGame from '../GoGame';
import playMoveReducer from './playMoveReducer';

const goGameReducer = (game = new GoGame(), action) => {
  switch (action.type) {
    case 'PLAY_MOVE':
      return playMoveReducer(game, action);
    default:
      return game;
  }
};

export default goGameReducer;
