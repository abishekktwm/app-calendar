import React from 'react';
import BigCalendar from 'react-big-calendar';
import { shallow } from 'enzyme';

import Calendar from '../calendar';
import { pipefy } from '../../../__mocks__';
import { flushPromises } from '../../utils/testUtils'

describe('Calendar', () => {
  it('render with big calendar', async () => {
    const wrapper = shallow(<Calendar pipefy={pipefy} />);
    expect(wrapper.find(BigCalendar)).toHaveLength(1);
    await flushPromises();
    wrapper.update();
    expect(wrapper.find(BigCalendar).props()).toMatchSnapshot();
  });
});
