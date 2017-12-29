// @flow

import React from 'react';

type Props = { handleNavigate: (action: string) => void };

const items = [
  { id: 'prev', label: null, icon: 'bold-arrow-left', title: 'Previous' },
  { id: 'today', label: 'Today', icon: null, title: 'Today' },
  { id: 'next', label: null, icon: 'bold-arrow-right', title: 'Next' },
];

const Navigations = ({ handleNavigate }: Props) => (
  <span className="rbc-btn-group pipe-navigate">
    {items.map(({ icon, id, label, title }) => (
      <a
        className={id}
        href={`#navigate_${id}`}
        key={id}
        onClick={() => handleNavigate(id.toUpperCase())}
        tabIndex="0"
        title={title}
      >
        {icon && <span className={`pp-ico-${icon}`} />}
        {label && label}
      </a>
    ))}
  </span>
);

export default Navigations;
