import { Observable } from 'rx';
import Cycle from '@cycle/core';
import { makeDOMDriver, div, input } from '@cycle/dom';

import { goGameReducer, actions, CycleGoban, gobanClicks } from '../src';

/**
 * Mark selector component. A checkbox to choose if we want to set marks, and an input to choose
 * the mark.
 */
const MarkSelector = ({ DOM }) => {
  const vtree$ = Observable.of(
    div([
      input('#set-mark-toggle', { type: 'checkbox', value: 'Set marks' }),
      input('#mark-input', { type: 'text' }),
    ])
  );

  const toggle$ = DOM.select('#set-mark-toggle')
    .events('click')
    .map(e => e.currentTarget.checked)
    .startWith(false);
  const inputEvent$ = Observable.merge(
    DOM.select('#mark-input').events('change'),
    DOM.select('#mark-input').events('input'),
    DOM.select('#mark-input').events('textInput')
  );

  const label$ = inputEvent$
    .map(e => e.currentTarget.value)
    .startWith('')
    .distinctUntilChanged();

  const chosenMark$ = Observable.combineLatest(toggle$, label$,
    (isChecked, label) => ({ isChecked, label })
  );

  return {
    DOM: vtree$,
    chosenMark$,
  };
};

const main = ({ DOM }) => {
  const gobanClicks$ = gobanClicks(DOM);

  const markSelector = MarkSelector({ DOM });

  const games$ = gobanClicks$
    .withLatestFrom(markSelector.chosenMark$, ({ i, j }, { isChecked, label }) =>
      (isChecked ? actions.setMark({ i, j }, label) : actions.playMove(i, j)))
    .startWith(actions.init())
    .scan(goGameReducer, undefined);

  const cycleGoban = CycleGoban({ games$ });

  const trees$ = Observable.combineLatest(cycleGoban.DOM, markSelector.DOM,
    (gobanVtree, markSelectorVtree) => div([gobanVtree, markSelectorVtree])
  );

  return {
    DOM: trees$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
