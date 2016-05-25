/* eslint-env mocha */
import _ from 'lodash';
import { expect } from 'chai';

import { GoGame } from '../../src';

describe('GoGame', () => {
  describe('default / empty GoGame object', () => {
    it('Should contain a 19x19 array of empty objects', () => {
      const game = new GoGame();
      const expected = _.map(Array(19), () => _.fill(Array(19), {}));

      expect(game.board).to.deep.equal(expected);
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
