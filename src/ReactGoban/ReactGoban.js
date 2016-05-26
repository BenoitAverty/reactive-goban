import React from 'react';
import _ from 'lodash';

const constructJsxBoard = (board) => {

  const line = _.map(Array(19), (i, index) => <div key={index} className="goban-item-empty"></div>);
  const lines = _.map(Array(19), (i, index) => (
    <div key={index} className="goban-line">{_.clone(line)}</div>
  ));

  return (
    <div>
      {lines}
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
