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

export default ({ label, loading, onNavigate, onViewChange, view, views }: Props) => (
  <div className="rbc-toolbar">
    <span className="rbc-toolbar-label">{label}</span>
    {loading && (
      <span className="rbc-btn-group pipe-navigate">
        <span className="pp-ico-loading pp-color-info" />
      </span>
    )}
    {!loading && <Navigations handleNavigate={onNavigate} loading={loading} />}
    {!loading && (
      <Views
        availableViews={views}
        currentView={view}
        loading={loading}
        onViewChange={onViewChange}
      />
    )}
  </div>
);
