import React from 'react';
import _ from 'lodash';

const constructJsxBoard = (board) => {
  const jsxBoard = _.map(board, (row, rowIndex) => (
    <div className="reactive-goban-line" key={rowIndex}>{
        _.map(row, (intersection, columnIndex) => {
          if (intersection.stone !== undefined) {
            return (
              <div key={`${rowIndex}${columnIndex}`} className="reactive-goban-intersection">
                <span className={`reactive-goban-stone-${intersection.stone.toLowerCase()}`} />
              </div>
            );
          }
          else {
            return (
              <div key={`${rowIndex}${columnIndex}`} className="reactive-goban-intersection">
              </div>
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
};

const ReactGoban = ({ board }) =>
  <div>
    <h1>Go Game:</h1>
    {constructJsxBoard(board)}
  </div>
;

ReactGoban.propTypes = {
  board: React.PropTypes.array,
};

export default ReactGoban;
