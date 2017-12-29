import React from 'react';
import renderer from 'react-test-renderer';

import Event from '../event';
import { e, event, pipefy } from '../../../__mocks__';

describe('Event', () => {
  const component = renderer.create(<Event event={event} pipefy={pipefy} />);

  it('render', () => {
    expect(component.toJSON()).toMatchSnapshot();
    expect(pipefy.openCard).not.toBeCalled();
  });

  it('calls open card', () => {
    component.toJSON().props.onClick(e);
    expect(e.preventDefault).toBeCalled();
    expect(pipefy.openCard).toBeCalledWith(event.id);
  });
});
