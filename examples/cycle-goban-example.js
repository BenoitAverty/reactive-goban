import Cycle from '@cycle/core';

import { CycleGoban, actions } from '../src';

const main = ({ Goban }) => {
  const actions$ = Goban.clicks.map(click => actions.playMove(click.i, click.j));

  return { Goban: actions$ };
};

const drivers = {
  Goban: CycleGoban.makeCycleGobanDriver('#app'),
};

Cycle.run(main, drivers);
