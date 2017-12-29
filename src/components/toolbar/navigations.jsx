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
    {items.map(({ icon, id, label }) => (
      <a
        className={id}
        href={`#navigate_${id}`}
        key={id}
        onClick={() => handleNavigate(id.toUpperCase())}
      >
        {icon && <span className={`pp-ico-${icon}`} />}
        {label && label}
      </a>
    ))}
  </span>
);

export default Navigations;
