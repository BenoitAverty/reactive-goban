import Cycle from '@cycle/core';
import { makeDOMDriver, div, input } from '@cycle/dom';

import { goGameReducer, actions, CycleGoban, gobanClicks } from '../src';

const main = ({ DOM: DOMSource }) => {
  const gobanClicks$ = gobanClicks(DOMSource);
  const checkboxState$ = DOMSource.select('#set-mark').events('click')
    .map(e => e.currentTarget.checked)
    .startWith(false);

  const games$ = gobanClicks$
    .withLatestFrom(checkboxState$, ({ i, j }, isChecked) =>
      (isChecked ? actions.setMark({ i, j }) : actions.playMove(i, j)))
    .startWith(actions.init())
    .scan(goGameReducer, undefined);

  const cycleGoban = CycleGoban({ games$ });

  const trees$ = cycleGoban.DOM.map(t =>
    div([
      t,
      div([
        input({ type: 'checkbox', value: 'Set marks', id: 'set-mark' }),
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
