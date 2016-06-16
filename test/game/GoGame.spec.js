/* eslint-env mocha */
import _ from 'lodash';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { GoGame, actions, goGameReducer } from '../../src';

describe('GoGame', () => {
  describe('default / empty GoGame object', () => {
    it('Should return the result of the reducer with init action', () => {
      const game = new GoGame();

      expect(game).to.deep.equal(new GoGame(goGameReducer(undefined, actions.init())));
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

  /* eslint-disable no-underscore-dangle */
  describe('Shortcuts methods', () => {
    const resultGame = { board: [], moves: [], actions: [] };
    const reducerStub = sinon.stub().returns(resultGame);
    before(() => {
      GoGame.__Rewire__('goGameReducer', reducerStub);
    });
    after(() => {
      GoGame.__ResetDependency__('goGameReducer');
    });

    it('Should not include the init() action', () => {
      const game = new GoGame();
      expect(game.init).to.not.exist;
    });

    const methods = {
      playMove: [3, 3],
      pass: [],
      setMark: [{ i: 3, j: 3 }, 'test'],
    };

    _.forOwn(methods, (actionArgs, action) => {
      describe(`${action} method`, () => {
        it(`Should call the reducer with itself and actions.${action}(), passing its args`, () => {
          const game = new GoGame();
          game[action](...actionArgs);

          expect(reducerStub).to.have.been.calledWith(game, actions[action](...actionArgs));
        });

        it('Should return the result of the reducer as a GoGame object', () => {
          const game = new GoGame();
          const actual = game[action](...actionArgs);

          expect(actual).to.deep.equal(new GoGame(resultGame));
        });
      });
    });
  });
});
