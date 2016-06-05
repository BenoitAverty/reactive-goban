import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';

import { goGameReducer, actions, CycleGoban, gobanClicks } from '../src';

const main = ({ DOM }) => {
  const gobanClicks$ = gobanClicks(DOM);

  const games$ = gobanClicks$
    .map(({ i, j }) => actions.playMove(i, j))
    .startWith(actions.init())
    .scan(goGameReducer, undefined);

  const trees$ = CycleGoban(games$);

  return {
    DOM: trees$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
