import { div, span } from '@cycle/dom';
import _ from 'lodash';

export function CycleGoban({ games$ }) {
  const trees$ = games$.map(game =>
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

  return { DOM: trees$ };
}

export function gobanClicks(DOMSources) {
  return DOMSources.select('.reactive-goban-intersection').events('click').map(event => ({
    i: event.currentTarget['data-row']+1,
    j: event.currentTarget['data-column']+1,
    event,
  }));
}

export default CycleGoban;
