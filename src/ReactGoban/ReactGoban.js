import React from 'react';
import _ from 'lodash';

function jsxIntersection(intersection) {
  const hasStone = i => i.stone !== undefined && i.stone !== null;
  const hasMark = i => i.mark !== undefined && i.mark !== null;

  if (hasStone(intersection) && hasMark(intersection)) {
    return (
      <span className={`reactive-goban-stone-${intersection.stone.toLowerCase()}`}>
        <span className={`reactive-goban-mark-${intersection.mark.toLowerCase()}`} />
      </span>
    );
  }
  else if (hasStone(intersection)) {
    return <span className={`reactive-goban-stone-${intersection.stone.toLowerCase()}`} />;
  }
  else if (hasMark(intersection)) {
    return <span className={`reactive-goban-mark-${intersection.mark.toLowerCase()}`} />;
  }
  else {
    return <span />;
  }
}

function jsxBoard(board, onIntersectionClick) {
  const jsx = _.map(board, (row, rowIndex) => (
    <div className="reactive-goban-line" key={rowIndex}>{
        _.map(row, (intersection, columnIndex) =>
          <div
            key={`${rowIndex}${columnIndex}`}
            className="reactive-goban-intersection"
            onClick={(event) => onIntersectionClick(rowIndex+1, columnIndex+1, event)}
          >
            {jsxIntersection(intersection)}
          </div>
        )
    }</div>
  ));

  return (
    <div className="reactive-goban">
      {jsx}
    </div>
  );
}

const ReactGoban = ({ board, onIntersectionClick }) =>
  <div>
    <h1>Go Game:</h1>
    {jsxBoard(board, onIntersectionClick)}
  </div>
;

ReactGoban.propTypes = {
  board: React.PropTypes.array.isRequired,
  onIntersectionClick: React.PropTypes.func,
};

export default ReactGoban;
