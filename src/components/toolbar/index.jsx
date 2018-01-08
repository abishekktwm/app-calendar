// @flow

import React from 'react';

import Navigations from './navigations';
import Views from './views';

type Props = {
  label: string,
  loading: boolean,
  onNavigate: () => void,
  onViewChange: () => void,
  view: string,
  views: Array<string>,
};

const Toolbar = ({ label, loading, onNavigate, onViewChange, view, views }: Props) => (
  <div className="rbc-toolbar">
    <span className="rbc-toolbar-label">{label}</span>
    {loading && (
      <span className="rbc-btn-group pipe-navigate pp-position-absolute">
        <span className="pp-ico-loading pp-color-info" />
      </span>
    )}
    {!loading && <Navigations handleNavigate={onNavigate} />}
    {!loading && (
      <Views availableViews={views} currentView={view} handleViewChange={onViewChange} />
    )}
  </div>
);

export default Toolbar;
