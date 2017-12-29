// @flow

import React from 'react';

type Props = { handleNavigate: (action: string) => void };

const items = [
  { id: 'prev', label: null, icon: 'bold-arrow-left' },
  { id: 'today', label: 'Today', icon: null },
  { id: 'next', label: null, icon: 'bold-arrow-right' },
];

const Navigations = ({ handleNavigate }: Props) => (
  <span className="rbc-btn-group pipe-navigate">
    {items.map(item => (
      <a
        className={item.id}
        href={`#navigate_${item.id}`}
        key={item.id}
        onClick={() => handleNavigate(item.id.toUpperCase())}
      >
        {item.icon && <span className={`pp-ico-${item.icon}`} />}
        {item.label && item.label}
      </a>
    ))}
  </span>
);

export default Navigations;
