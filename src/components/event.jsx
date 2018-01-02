// @flow

import React from 'react';

import type { Card, Pipefy } from '../models';

type Props = {
  event: Card,
  pipefy: Pipefy,
};

const openCard = (e, id, pipefy) => {
  e.preventDefault();
  pipefy.openCard(id);
};

const Event = ({ event, pipefy }: Props) => (
  <a href="#open_card" onClick={e => openCard(e, event.id, pipefy)}>
    {event.title}
  </a>
);

export default Event;
