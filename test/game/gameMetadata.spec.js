/* eslint-env mocha */

import { expect } from 'chai';

import GameMetadata from '../../src/GoGame/GameMetadata';

describe('GameMetadata', () => {
  describe('Default GameMetadata', () => {
    it('Should have two players properties', () => {
      const metadata = new GameMetadata();

      expect(metadata.players.black).to.exist;
      expect(metadata.players.white).to.exist;
    });

    it('Should have players with default names corresponding to their color', () => {
      const metadata = new GameMetadata();

      expect(metadata.players.black).to.equal('Black');
      expect(metadata.players.white).to.equal('White');
    });
  });
});
