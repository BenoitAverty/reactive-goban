import playMoveReducer from './playMoveReducer';

const initialGame = {
  board: {},
  moves: [],
  koCoordinates: null,
  actions: [],
};

const goGameReducer = (game = initialGame, action) => {
  switch (action.type) {
    case 'PLAY_MOVE':
      return playMoveReducer(game, action);
    default:
      return game;
  }
};

export default goGameReducer;
