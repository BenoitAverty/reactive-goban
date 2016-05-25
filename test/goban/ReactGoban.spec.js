/* eslint-env mocha */
import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { ReactGoban, GoGame } from '../../src';

describe('ReactGoban Component', () => {
  it('Should render an empty board', () => {
    const game = new GoGame();
    const wrapper = shallow(<ReactGoban board={game.board} />);
    const expected = (
      <div>
        {
          _.fill(Array(19),
          <div className="goban-line">
            {_.fill(Array(19), <div className="goban-item-empty"></div>)}
          </div>)
        }
      </div>
    );

    expect(wrapper).to.equal(expected);
  });
});
