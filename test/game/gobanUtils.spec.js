/* eslint-env mocha */
import _ from 'lodash';
import { expect } from 'chai';

import { stoneGroup } from '../../src/GoGame/gobanUtils';

function gobanFixture(coordinatesWithStones) {
  const board = _.map(Array(19), () => _.fill(Array(19), {}));

  _.forEach(coordinatesWithStones, (c) => {
    board[c.i][c.j] = c;
  });

  return board;
}

describe('gobanUtils', () => {
  describe('stoneGroup method', () => {
    it('Should return an empty array when no stone is at coordinates', () => {
      const board = gobanFixture();
      const expected = [];
      const actual = stoneGroup({ i: 3, j: 3, stone: 'BLACK' }, board);

      expect(actual).to.deep.equal(expected);
    });

    it('Should return correctly the only stone of a group', () => {
      const board = gobanFixture([{ i: 3, j: 3, stone: 'BLACK' }]);
      const expected = [{ i: 3, j: 3 }];

      const actual = stoneGroup({ i: 3, j: 3 }, board);

      expect(actual).to.deep.equal(expected);
    });
  });
});
