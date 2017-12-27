// @flow

import React from 'react';

type Props = { handleNavigate: (action: string) => void };

const navigations = [
  { id: 'PREV', label: null, icon: 'bold-arrow-left' },
  { id: 'TODAY', label: 'Today', icon: null },
  { id: 'NEXT', label: null, icon: 'bold-arrow-right' },
];

export default ({ handleNavigate }: Props) => (
  <span className="rbc-btn-group pipe-navigate">
    {navigations.map(navigation => (
      <a
        className={navigation.id}
        href={`#navigate_${navigation.id}`}
        key={navigation.id}
        onClick={() => handleNavigate(navigation.id.toUpperCase())}
      >
        {navigation.icon && <span className={`pp-ico-${navigation.icon}`} />}
        {navigation.label && navigation.label}
      </a>
    ))}
  </span>
);
