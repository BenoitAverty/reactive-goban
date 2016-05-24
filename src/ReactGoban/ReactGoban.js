import React from 'react';

const ReactGoban = ({ game }) =>
  <div>
    <h1>Go Game:</h1>
    <ul>
      {game.stones.map(s => <li>`${s}`</li>)}
    </ul>
    <ul>

    </ul>
  </div>
;

ReactGoban.propTypes = {
  game: React.PropTypes.object,
};

export default ReactGoban;
