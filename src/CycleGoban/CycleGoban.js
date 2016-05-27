import { div, span, makeDOMDriver } from '@cycle/dom';

import actions from '../GoGame/actions';
import goGameReducer from '../GoGame/reducer';

function makeCycleGobanDriver(selectorOrElement) {
  const domDriver = makeDOMDriver(selectorOrElement);

  return (actions$) => {
    const games$ = actions$
      .startWith(actions.init())
      .scan((prevGame, action) => goGameReducer(prevGame, action), undefined);

    const $trees = games$.map((game) =>
      div('.reactive-goban', [
        span(JSON.stringify(game)),
      ])
    );

    return domDriver($trees);
  };
}

export default {
  makeCycleGobanDriver,
};
