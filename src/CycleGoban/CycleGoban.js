import { div, span, makeDOMDriver } from '@cycle/dom';
import _ from 'lodash';

import actions from '../GoGame/actions';
import goGameReducer from '../GoGame/reducer';

function makeCycleGobanDriver(selectorOrElement) {
  const domDriver = makeDOMDriver(selectorOrElement);

  return (actions$) => {
    const games$ = actions$
      .startWith(actions.init())
      .scan((prevGame, action) => goGameReducer(prevGame, action), undefined);

    const $trees = games$.map((game) =>
      div('.reactive-goban', _.map(game.board, (row, rowIndex) =>
        div('.reactive-goban-line', _.map(row, (intersection, columnIndex) => {
          if (intersection.stone !== undefined && intersection.stone !== null) {
            return div('.reactive-goban-intersection', {
              'data-row': rowIndex, 'data-column': columnIndex,
            },
            span(`.reactive-goban-stone-${intersection.stone.toLowerCase()}`));
          }
          else {
            return div('.reactive-goban-intersection', {
              'data-row': rowIndex, 'data-column': columnIndex,
            });
          }
        }))
      ))
    );

    const elements = domDriver($trees);

    return {
      actions: games$.map(game => game.actions[game.actions.length-1]),
      clicks: elements.select('.reactive-goban-intersection').events('click').map(event => ({
        i: event.currentTarget['data-row']+1,
        j: event.currentTarget['data-column']+1,
        event,
      })),
    };
  };
}

export default {
  makeCycleGobanDriver,
};
