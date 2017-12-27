// @flow

import React from 'react';

import Navigations from './navigations';
import Views from './views';

type Props = {
  label: string,
  onNavigate: () => void,
  onViewChange: () => void,
  view: string,
  views: Array<string>,
};

export default ({ label, onNavigate, onViewChange, view, views }: Props) => (
  <div className="rbc-toolbar">
    <span className="rbc-toolbar-label">{label}</span>
    <Navigations handleNavigate={onNavigate} />
    <Views availableViews={views} currentView={view} onViewChange={onViewChange} />
  </div>
);
