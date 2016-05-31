import React from 'react';
import _ from 'lodash';

function constructJsxBoard(board, onIntersectionClick) {
  const jsxBoard = _.map(board, (row, rowIndex) => (
    <div className="reactive-goban-line" key={rowIndex}>{
        _.map(row, (intersection, columnIndex) => {
          if (intersection.stone !== undefined && intersection.stone !== null) {
            return (
              <div
                key={`${rowIndex}${columnIndex}`}
                className="reactive-goban-intersection"
                onClick={(event) => onIntersectionClick(rowIndex+1, columnIndex+1, event)}
              >
                <span className={`reactive-goban-stone-${intersection.stone.toLowerCase()}`} />
              </div>
            );
          }
          else {
            return (
              <div
                key={`${rowIndex}${columnIndex}`}
                className="reactive-goban-intersection"
                onClick={(event) => onIntersectionClick(rowIndex+1, columnIndex+1, event)}
              />
            );
          }
        })
    }</div>
  ));

  return (
    <div className="reactive-goban">
      {jsxBoard}
    </div>
  );
}

const ReactGoban = ({ board, onIntersectionClick }) =>
  <div>
    <h1>Go Game:</h1>
    {constructJsxBoard(board, onIntersectionClick)}
  </div>
;

ReactGoban.propTypes = {
  board: React.PropTypes.array.required,
  onIntersectionClick: React.PropTypes.func,
};

export default ReactGoban;
