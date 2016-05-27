/* eslint-env mocha */

import _ from 'lodash';
import { expect } from 'chai';

import { goGameReducer, GoGame, actions } from '../../src';

describe('Game Reducer', () => {
  describe('With the init() action', () => {
    it('Should return the previous state', () => {
      const state = {};
      const result = goGameReducer(state, actions.init());

      expect(result).to.equal(state);
    });
  });

  describe('With the playMove(i,j) action', () => {
    describe('In the nominal case', () => {
      it('Should contain a new entry in the "moves" property', () => {
        const game = new GoGame();
        const expectedMove = { i: 3, j: 3 };

        const newGame = goGameReducer(game, actions.playMove(3, 3));

        expect(newGame.moves).to.contain(expectedMove);
        expect(newGame.moves.length).to.equal(game.moves.length + 1);
      });

      it('Should have a new stone at the right coordinates', () => {
        const game = new GoGame();
        const expectedBlackStone = {
          stone: 'BLACK',
        };
        const expectedWhiteStone = {
          stone: 'WHITE',
        };

        let newGame = goGameReducer(game, actions.playMove(3, 3));
        expect(newGame.board[2][2]).to.exist.and.deep.equal(expectedBlackStone);

        newGame = goGameReducer(newGame, actions.playMove(16, 16));
        expect(newGame.board[15][15]).to.exist.and.deep.equal(expectedWhiteStone);
      });

      it('Should save the action with a status of "SUCCESS"', () => {
        const game = new GoGame();
        const action = actions.playMove(15, 15);

        const newGame = goGameReducer(game, action);

        expect(newGame.actions[0]).to.exist;
        expect(newGame.actions[0].status).to.equal('SUCCESS');
        expect(newGame.actions[0].action).to.equal(action);
      });
    });

    describe('Playing on an existing stone', () => {
      it('Should not modify the moves or the board', () => {
        const game = goGameReducer(new GoGame(), actions.playMove(3, 3));
        const newGame = goGameReducer(game, actions.playMove(3, 3));

        expect(newGame.board).to.equal(game.board);
        expect(newGame.moves).to.equal(game.moves);
      });

      it('Should save the action with status "FAILURE" and reason "EXISTING_STONE"', () => {
        const game = goGameReducer(new GoGame(), actions.playMove(3, 3));
        const action = actions.playMove(3, 3);
        const newGame = goGameReducer(game, action);

        const savedAction = newGame.actions[1];
        expect(savedAction.action).to.equal(action);
        expect(savedAction.status).to.equal('FAILURE');
        expect(savedAction.reason).to.equal('EXISTING_STONE');
      });
    });

    describe('Playing outside the board', () => {
      it('Should not modify the moves or the board', () => {
        const game = new GoGame();
        let newGame = goGameReducer(game, actions.playMove(3, 20));
        newGame = goGameReducer(game, actions.playMove(0, 3));
        newGame = goGameReducer(game, actions.playMove(20, 3));
        newGame = goGameReducer(game, actions.playMove(3, 0));

        expect(newGame.board).to.equal(game.board);
        expect(newGame.moves).to.equal(game.moves);
      });

      it('Should save the action with status "FAILURE" and reason "OUTSIDE_BOARD"', () => {
        const game = new GoGame();

        const playActions = [
          actions.playMove(3, 20),
          actions.playMove(0, 3),
          actions.playMove(20, 3),
          actions.playMove(3, 0),
        ];

        _.forEach(playActions, (action) => {
          const newGame = goGameReducer(game, action);

          const savedAction = newGame.actions[0];
          expect(savedAction.action).to.equal(action);
          expect(savedAction.status).to.equal('FAILURE');
          expect(savedAction.reason).to.equal('OUTSIDE_BOARD');
        });
      });
    });

    describe('Capturing a stone', () => {
      it('Should remove the captured stone from the board', () => {
        const plays = [
          actions.playMove(3, 4),
          actions.playMove(4, 4),
          actions.playMove(4, 3),
          actions.pass(),
          actions.playMove(4, 5),
          actions.pass(),
          actions.playMove(5, 4),
        ];

        const game = _.reduce(plays, goGameReducer, new GoGame());

        expect(game.board[3][3]).to.deep.equal({ stone: null });
      });
    });
  });

  describe('With the pass() action', () => {
    it('Should not modify the board', () => {
      const game = new GoGame();

      const newGame = goGameReducer(game, actions.pass());

      expect(newGame.board).to.equal(game.board);
    });

    it('Should add a move with coordinates undefined', () => {
      const game = new GoGame();

      const newGame = goGameReducer(game, actions.pass());
      const lastMove = newGame.moves[0];

      expect(lastMove).to.exist;
      expect(lastMove.i).to.not.exist;
      expect(lastMove.j).to.not.exist;
    });

    it('Should save the action with a status of "SUCCESS"', () => {
      const game = new GoGame();
      const action = actions.pass();

      const newGame = goGameReducer(game, action);

      expect(newGame.actions[0]).to.exist;
      expect(newGame.actions[0].status).to.equal('SUCCESS');
      expect(newGame.actions[0].action).to.equal(action);
    });
  });
});
