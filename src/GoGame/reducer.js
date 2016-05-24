import GoGame from './GoGame';

const reducer = (game = new GoGame(), action) => {
  switch (action.type) {
    default:
      return game;
  }
};

export default reducer;
