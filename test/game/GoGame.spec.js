/* eslint-env mocha */

import { expect } from 'chai';

import { GoGame } from '../../src';

describe('GoGame', () => {
  describe('default / empty GoGame object', () => {
    it('Should contain an empty object as board property', () => {
      const game = new GoGame();

      expect(game.board).to.deep.equal({});
    });

    it('Should have the ko property set to false', () => {
      const game = new GoGame();

      expect(game.ko).to.be.false;
    });

    it('Should have the koCoordinates property set to null', () => {
      const game = new GoGame();

      expect(game.koCoordinates).to.be.null;
    });

    it('Should contain no moves', () => {
      const game = new GoGame();

      expect(game.moves).to.be.empty;
    });

    it('Should contain no action', () => {
      const game = new GoGame();

      expect(game.actions).to.be.empty;
    });

    it('Should have a lastAction property set to null', () => {
      const game = new GoGame();

      expect(game.lastAction).to.be.null;
    });

    it('Should be black\'s turn', () => {
      const game = new GoGame();

      expect(game.turn).to.equal('BLACK');
    });
  });
});
