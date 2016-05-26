import Cycle from '@cycle/core';
import Rx from 'rx';

import { CycleGoban, actions } from '../src';

const main = () => ({
  Goban: Rx.Observable.just(actions.playMove(3, 3)),
});

const drivers = {
  Goban: CycleGoban.makeCycleGobanDriver('#app'),
};

Cycle.run(main, drivers);
