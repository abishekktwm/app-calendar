import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar from '../';
import props from '../../../../__mocks__/big_calendar';

describe('Toolbar', () => {
  it('render with a truthy loading props', () => {
    const component = renderer.create(<Toolbar {...props} loading />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render with a falsy loading props', () => {
    const component = renderer.create(<Toolbar {...props} loading={false} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
