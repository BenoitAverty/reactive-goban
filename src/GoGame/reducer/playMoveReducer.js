import _ from 'lodash';

const playMoveReducer = (game, action) => {
  const i = action.i;
  const j = action.j;
  const turn = (game.moves.length % 2 === 0) ? 'BLACK' : 'WHITE';
  const newMoves = _.concat(game.moves, { i, j });

  const newBoard = _.clone(game.board);
  newBoard[i] = _.clone(game.board[i]);
  newBoard[i][j] = Object.assign({}, game.board[i][j], { stone: turn });

  const newGameObject = Object.assign(
    {},
    game,
    {
      board: newBoard,
      moves: newMoves,
    }
  );

  return newGameObject;
};

export default playMoveReducer;
