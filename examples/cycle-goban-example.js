import Cycle from '@cycle/core';
import { makeDOMDriver, div, input } from '@cycle/dom';

import { goGameReducer, actions, CycleGoban, gobanClicks } from '../src';

const main = ({ DOM: DOMSources }) => {
  const gobanClicks$ = gobanClicks(DOMSources);

  const games$ = gobanClicks$
    .map(({ i, j }) => actions.playMove(i, j))
    .startWith(actions.init())
    .scan(goGameReducer, undefined);

  const cycleGoban = CycleGoban({ games$ });

  const trees$ = cycleGoban.DOM.map(t =>
    div([
      t,
      div([
        input({ type: 'checkbox', value: 'Set marks' }),
      ]),
    ])
  );

  return {
    DOM: trees$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
