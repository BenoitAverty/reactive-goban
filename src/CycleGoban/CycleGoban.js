import { div, span } from '@cycle/dom';

function hScriptMark(mark) {
  if (mark.length === 1) {
    return span('.reactive-goban-mark-char', mark);
  }
  else {
    return span(`.reactive-goban-mark-${mark}`);
  }
}

function hScriptIntersection(intersection) {
  const hasStone = i => i.stone !== undefined && i.stone !== null;
  const hasMark = i => i.mark !== undefined && i.mark !== null;

  if (hasStone(intersection) && hasMark(intersection)) {
    return span(`.reactive-goban-stone-${intersection.stone.toLowerCase()}`,
            hScriptMark(intersection.mark))
    ;
  }
  else if (hasStone(intersection)) {
    return span(`.reactive-goban-stone-${intersection.stone.toLowerCase()}`);
  }
  else if (hasMark(intersection)) {
    return hScriptMark(intersection.mark);
  }
  else {
    return span();
  }
}

export function CycleGoban({ games$ }) {
  const trees$ = games$.map(game =>
    div('.reactive-goban', game.board.map((row, rowIndex) =>
      div('.reactive-goban-line', row.map((intersection, columnIndex) =>
        div('.reactive-goban-intersection', {
          'data-row': rowIndex, 'data-column': columnIndex,
        },
        hScriptIntersection(intersection))
      ))
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
