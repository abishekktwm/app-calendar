import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar from '../';
import * as bigCalendarProps from '../../../../__mocks__/big_calendar';

describe('Toolbar', () => {
  it('render with a truthy loading props', () => {
    const component = renderer.create(<Toolbar {...bigCalendarProps} loading />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render with a falsy loading props', () => {
    const component = renderer.create(<Toolbar {...bigCalendarProps} loading={false} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
