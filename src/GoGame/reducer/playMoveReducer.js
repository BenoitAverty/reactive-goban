import { moveValidity, adjacentStones, groupLiberties, stoneGroup } from '../gobanUtils';

// Return a new game after applying the given action, which is assumed to be a playMove() action.
// Coordinates in the action are 1 indexed (from 1 to 19, as in real life).
function playMoveReducer(game, action) {
  // convert to internal 0-indexed coordinates
  const i = action.i - 1;
  const j = action.j - 1;

  const turn = (game.moves.length % 2 === 0) ? 'BLACK' : 'WHITE';
  const opponent = (game.moves.length % 2 === 0) ? 'WHITE' : 'BLACK';

  const validity = moveValidity({ i, j }, game.board);
  if (validity.valid) {
    const newMoves = game.moves.concat({ i: action.i, j: action.j });

    const newActions = game.actions.concat({ status: 'SUCCESS', action });

    const newBoard = [...game.board];
    newBoard[i] = [...game.board[i]];
    newBoard[i][j] = { ...game.board[i][j], stone: turn };

    adjacentStones({ i, j }, newBoard, opponent)
      .filter(coord => groupLiberties(coord, newBoard) === 0)
      .map(coord => stoneGroup(coord, newBoard))
      .reduce((acc, el) => acc.concat(...el), [])
      .forEach(coord => {
        newBoard[coord.i] = [...newBoard[coord.i]];
        newBoard[coord.i][coord.j] = { ...newBoard[coord.i][coord.j], stone: null };

        const lastAction = newActions[newActions.length-1];
        if (!lastAction.captures) {
          lastAction.captures = [];
        }

        // actions.captures are exposed to the client so they are indexed from 1 to 19
        lastAction.captures.push({ i: coord.i+1, j: coord.j+1 });
      });

    if (groupLiberties({ i, j }, newBoard) === 0) {
      return {
        ...game,
        actions: [...game.actions, { status: 'FAILURE', reason: 'SUICIDE', action }],
      };
    }
    else {
      return {
        ...game,
        board: newBoard,
        moves: newMoves,
        actions: newActions,
      };
    }
  }
  else {
    const newActions = game.actions.concat({
      status: 'FAILURE',
      reason: validity.reason,
      action,
    });

    return { ...game, actions: newActions };
  }
}

export default playMoveReducer;
