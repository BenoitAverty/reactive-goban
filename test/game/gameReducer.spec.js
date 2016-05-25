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

    it('Should return a default GoGame object when no state is passed', () => {
      const expected = new GoGame();
      const actual = goGameReducer(undefined, actions.init());

      expect(actual).to.deep.equal(expected);
    });
  });
});
