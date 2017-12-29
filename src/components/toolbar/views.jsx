// @flow

import React from 'react';
import classnames from 'classnames';

type Props = {
  availableViews: Array<string>,
  currentView: string,
  handleViewChange: (action: string) => void,
};

const Views = ({ availableViews, currentView, handleViewChange }: Props) => (
  <span className="rbc-btn-group">
    {availableViews.map(view => (
      <button
        className={classnames({ 'rbc-active': view === currentView })}
        key={view}
        onClick={() => handleViewChange(view)}
      >
        {view}
      </button>
    ))}
  </span>
);

export default Views;
