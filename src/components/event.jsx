// @flow

import React from 'react';

import type { Card, Pipefy } from '../types';

type Props = {
  event: Card,
  pipefy: Pipefy,
};

const openCard = (e, id, pipefy) => {
  e.preventDefault();
  pipefy.openCard(id);
};

export default ({ event, pipefy }: Props) => (
  <a href="#open_card" onClick={e => openCard(e, event.id, pipefy)}>
    {event.title}
  </a>
);
