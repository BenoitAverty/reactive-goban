import { Observable } from 'rx';
import Cycle from '@cycle/core';
import { makeDOMDriver, div, span, input, button } from '@cycle/dom';

import { goGameReducer, actions, CycleGoban, gobanClicks } from '../src';

/**
 * Offset component. Sets the offset for the game history
 */
const OffsetSelector = ({ DOM }) => {
  const vtree$ = Observable.of(
    span([
      button('#prev-position', '<'),
      button('#next-position', '>'),
    ])
  );

  const prevClick$ = DOM.select('#prev-position').events('click').map(1);
  const nextClick$ = DOM.select('#prev-position').events('click').map(-1);
  const offset$ = prevClick$.merge(nextClick$).scan((acc, v) => acc + v, 0).startWith(0).do(o => console.log(o));

  return {
    DOM: vtree$,
    offset$,
  };
};

/**
 * Mark selector component. A checkbox to choose if we want to set marks, and an input to choose
 * the mark.
 */
const MarkSelector = ({ DOM }) => {
  const vtree$ = Observable.of(
    span([
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
  const offsetSelector = OffsetSelector({ DOM });

  const goGameActions$ = gobanClicks$
    .withLatestFrom(markSelector.chosenMark$, ({ i, j }, { isChecked, label }) =>
      (isChecked ? actions.setMark({ i, j }, label) : actions.playMove(i, j)))
    .startWith(actions.init());

  const games$ = goGameActions$
    .scan(goGameReducer, undefined)
    .scan((acc, a) => acc.concat(Observable.just(a)), Observable.empty())
    .combineLatest(offsetSelector.offset$, (obs, offset) => obs.skipLast(offset).last())
    .switch()
    .do(g => console.log(g));

  const cycleGoban = CycleGoban({ games$ });

  const trees$ = Observable.combineLatest(cycleGoban.DOM, markSelector.DOM, offsetSelector.DOM,
    (gobanVtree, markSelectorVtree, offsetSelectorVtree) =>
      div([gobanVtree,
        div([markSelectorVtree, offsetSelectorVtree]),
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
