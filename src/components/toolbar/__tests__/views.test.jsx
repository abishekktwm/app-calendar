import React from 'react';
import renderer from 'react-test-renderer';

import Views from '../views';
import { onViewChange, views } from '../../../../__mocks__/big_calendar';

describe('Views', () => {
  const component = renderer.create(
    <Views availableViews={views} currentView="month" handleViewChange={onViewChange} />
  );

  it('render', () => {
    expect(component.toJSON()).toMatchSnapshot();
    expect(onViewChange).not.toBeCalled();
  });

  it('calls handle view change', () => {
    component.toJSON().children[1].props.onClick();
    expect(onViewChange).toBeCalledWith(views[1]);
  });
});
