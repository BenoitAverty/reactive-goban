import React from 'react';
import ReactDom from 'react-dom';

import { GoGame, ReactGoban } from '../src';

const game = new GoGame();

ReactDom.render(<ReactGoban game={game} />, document.getElementById('app'));
