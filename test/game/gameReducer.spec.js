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
      it('Should return a new object to ensure immutability', () => {
        const game = new GoGame();
        const newGame = goGameReducer(game, actions.playMove(3, 3));

        expect(newGame).to.not.equal(game);
      });

      it('Should become the turn of the other player', () => {
        const game = new GoGame();

        let newGame = goGameReducer(game, actions.playMove(3, 3));
        expect(newGame.turn).to.equal('WHITE');

        newGame = goGameReducer(newGame, actions.playMove(16, 16));
        expect(newGame.turn).to.equal('BLACK');
      });

      it('Should contain a new entry in the "moves" property', () => {
        const game = new GoGame();
        const expectedMove = { i: 3, j: 3 };

        const newGame = goGameReducer(game, actions.playMove(3, 3));

        expect(newGame.moves).to.contain(expectedMove);
        expect(newGame.moves.length).to.equal(game.moves.length + 1);
      });
    });
  });
});
