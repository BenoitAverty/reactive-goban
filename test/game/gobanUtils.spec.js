/* eslint-env mocha */
import _ from 'lodash';
import { expect } from 'chai';

import { stoneGroup, groupLiberties } from '../../src/GoGame/gobanUtils';

function aGoban(coordinatesWithStones) {
  const board = _.map(Array(19), () => _.fill(Array(19), {}));

  _.forEach(coordinatesWithStones, (c) => {
    board[c.i][c.j] = { stone: c.stone };
  });

  return board;
}

describe('gobanUtils', () => {
  describe('stoneGroup function', () => {
    it('Should return an empty array when no stone is at coordinates', () => {
      const board = aGoban();
      const expected = [];
      const actual = stoneGroup({ i: 3, j: 3, stone: 'BLACK' }, board);

      expect(actual).to.deep.equal(expected);
    });

    it('Should return correctly the only stone of a group', () => {
      const board = aGoban([{ i: 3, j: 3, stone: 'BLACK' }]);
      const expected = [{ i: 3, j: 3 }];

      const actual = stoneGroup({ i: 3, j: 3 }, board);

      expect(actual).to.deep.equal(expected);
    });

    it('Should return correctly a group of several stones', () => {
      const board = aGoban([
        { i: 3, j: 3, stone: 'BLACK' },
        { i: 3, j: 4, stone: 'BLACK' },
        { i: 3, j: 5, stone: 'BLACK' },
        { i: 4, j: 5, stone: 'BLACK' },
      ]);
      const expected = [{ i: 3, j: 3 }, { i: 3, j: 4 }, { i: 3, j: 5 }, { i: 4, j: 5 }];

      const actual = stoneGroup({ i: 3, j: 3 }, board);

      expect(actual).to.deep.equal(expected);
    });

    it('Should not return adjacent stones of other colors', () => {
      const board = aGoban([
        { i: 3, j: 3, stone: 'BLACK' },
        { i: 3, j: 4, stone: 'BLACK' },
        { i: 3, j: 5, stone: 'WHITE' },
        { i: 4, j: 5, stone: 'BLACK' },
      ]);
      const expected = [{ i: 3, j: 3 }, { i: 3, j: 4 }];

      const actual = stoneGroup({ i: 3, j: 3 }, board);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('groupLiberties function', () => {
    it('should count 4 liberties for a single stone', () => {
      const board = aGoban([{ i: 3, j: 3, stone: 'BLACK' }]);

      const liberties = groupLiberties({ i: 3, j: 3 }, board);

      expect(liberties).to.equal(4);
    });

    it('Should count liberties of an entire group of stones', () => {
      const board = aGoban([
        { i: 3, j: 3, stone: 'BLACK' },
        { i: 3, j: 4, stone: 'BLACK' },
      ]);

      const liberties = groupLiberties({ i: 3, j: 3 }, board);

      expect(liberties).to.equal(6);
    });

    it('Should no count intersections with opponent\'s stone', () => {
      const board = aGoban([
        { i: 3, j: 3, stone: 'BLACK' },
        { i: 3, j: 4, stone: 'BLACK' },
        { i: 3, j: 5, stone: 'WHITE' },
      ]);

      const liberties = groupLiberties({ i: 3, j: 3 }, board);

      expect(liberties).to.equal(5);
    });
  });
});
