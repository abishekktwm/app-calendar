// @flow

import React from 'react';
import classnames from 'classnames';

type Props = {
  availableViews: Array<string>,
  currentView: string,
  onViewChange: (action: string) => void,
};

export default ({ availableViews, currentView, onViewChange }: Props) => (
  <span className="rbc-btn-group">
    {availableViews.map(view => (
      <button
        className={classnames({ 'rbc-active': view === currentView })}
        key={view}
        onClick={() => onViewChange(view)}
      >
        {view}
      </button>
    ))}
  </span>
);
