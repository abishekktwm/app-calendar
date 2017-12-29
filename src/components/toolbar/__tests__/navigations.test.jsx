import React from 'react';
import renderer from 'react-test-renderer';

import Navigations from '../navigations';
import { onNavigate } from '../../../../__mocks__/big_calendar';

describe('Navigations', () => {
  const component = renderer.create(<Navigations handleNavigate={onNavigate} />);

  it('render', () => {
    expect(component.toJSON()).toMatchSnapshot();
    expect(onNavigate).not.toBeCalled();
  });

  it('calls handle navigate', () => {
    component.toJSON().children[0].props.onClick();
    expect(onNavigate).toBeCalledWith('PREV');
  });
});
