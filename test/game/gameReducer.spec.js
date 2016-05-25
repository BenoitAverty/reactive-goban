/* eslint-env mocha */

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
        const expectedBlackSone = {
          stone: 'BLACK',
        };
        const expectedWhiteSone = {
          stone: 'WHITE',
        };

        let newGame = goGameReducer(game, actions.playMove(3, 3));
        expect(newGame.board[3][3]).to.exist.and.deep.equal(expectedBlackSone);

        newGame = goGameReducer(newGame, actions.playMove(16, 16));
        expect(newGame.board[16][16]).to.exist.and.deep.equal(expectedWhiteSone);
      });

      it('Should have saved the action with a status of "SUCCESS"', () => {
        const game = new GoGame();
        const action = actions.playMove(15, 15);

        const newGame = goGameReducer(game, action);

        expect(newGame.actions[0]).to.exist;
        expect(newGame.actions[0].status).to.equal('SUCCESS');
        expect(newGame.actions[0].action).to.equal(action);
      });
    });
  });
});
