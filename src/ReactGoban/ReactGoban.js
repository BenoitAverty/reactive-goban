import React from 'react';
import _ from 'lodash';

const constructJsxBoard = (board) => {
  const filledBoard = _.map(Array(19), () => _.fill(Array(19), '_'));

  _.forOwn(board, (line, i) => {
    _.forOwn(line, (column, j) => {
      filledBoard[i-1][j-1] = 'x';
    });
  });

  const ret = _(filledBoard)
  .map(line => _.reduce(line, (lineBefore, el) => lineBefore + el, ''))
  .map((line, index) => (<span key={index}>{line}<br /></span>));

  return (
    <pre>
      {_.toArray(ret)}
    </pre>
  );
};

const ReactGoban = ({ board }) =>
  <div>
    <h1>Go Game:</h1>
    {constructJsxBoard(board)}
  </div>
;

ReactGoban.propTypes = {
  board: React.PropTypes.object,
};

export default ReactGoban;
