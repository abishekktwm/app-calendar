/* global document, PipefyApp */
import React from 'react';
import ReactDOM from 'react-dom';

import './polyfills';
import Calendar from './components/calendar';

const pipefy = PipefyApp.init();

PipefyApp.render(() => null);
ReactDOM.render(
  <Calendar pipefy={pipefy} />,
  document.getElementById('calendar')
);
