/* eslint-env mocha */

import { expect } from 'chai';

import GameMetadata from '../../src/GoGame/GameMetadata';

import { GoGame } from '../../src';

describe('Creating a new Game', () => {
  describe('With no parameters', () => {
    it('should return an instance of GoGame', () => {
      const game = new GoGame();

      expect(game).to.exist.and.be.an.instanceof(GoGame);
    });

    it('Should have a GameMetadata property', () => {
      const game = new GoGame();

      expect(game.metadata).to.exist.and.be.an.instanceof(GameMetadata);
    });
  });
});
