import {
  endDateByView,
  startDateByView,
  transformEdgesToEvents,
  mountFilters,
} from '../';
import data from '../../../__mocks__/apollo';
import { card, event } from '../../../__mocks__';

const date = new Date(card.due_date);
const startDate = '2018-04-01T00:00:00.000Z';
const endDate = '2018-04-30T23:59:59.999Z';

describe('End date by view', () => {
  it('returns the last day of the month', () => {
    const result = endDateByView(date, 'month');
    expect(result).toBe('2017-12-31T23:59:59.999Z');
  });

  it('returns the last day of the week', () => {
    const result = endDateByView(date, 'week');
    expect(result).toBe('2017-12-16T23:59:59.999Z');
  });

  it('returns the last hour of the day', () => {
    const result = endDateByView(date, 'day');
    expect(result).toBe('2017-12-15T23:59:59.999Z');
  });

  it('returns the end date based on the agenda view', () => {
    const result = endDateByView(date, 'agenda');
    expect(result).toBe('2018-01-14T23:59:59.999Z');
  });
});

describe('Start date by view', () => {
  it('returns the first day of the month', () => {
    const result = startDateByView(date, 'month');
    expect(result).toBe('2017-12-01T00:00:00.000Z');
  });

  it('returns the first day of the week', () => {
    const result = startDateByView(date, 'week');
    expect(result).toBe('2017-12-10T00:00:00.000Z');
  });

  it('returns the first hour of the day', () => {
    const result = startDateByView(date, 'day');
    expect(result).toBe('2017-12-15T00:00:00.000Z');
  });

  it('returns the start date based on the agenda view', () => {
    const result = startDateByView(date, 'agenda');
    expect(result).toBe('2017-12-15T00:00:00.000Z');
  });
});

it('Transform edges to events', () => {
  const result = transformEdgesToEvents(data.cardSearch);
  const expected = [event];
  expect(result).toEqual(expect.arrayContaining(expected));
});

describe('mountFilters', () => {
  describe('when filter is null', () => {
      const expectedResult = {
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
        ],
      };

    it('returns only dates when filter is null', () => {
      expect(mountFilters(startDate, endDate, null)).toEqual(expectedResult);
    })

    it('returns only dates when filter is undefined', () => {
      expect(mountFilters(startDate, endDate, undefined)).toEqual(expectedResult);
    })
  })

  describe('with only title filter', () => {
    it('returns only dates when title filter is empty', () => {
      const filters = { title: '', labelIds: [], assigneeIds: [] };
      const expectedResult = {
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
        ],
      };
      expect(mountFilters(startDate, endDate, filters)).toEqual(expectedResult);
    });

    it('returns dates and title when title filter is present', () => {
      const filters = { title: 'Testint Title', labelIds: [], assigneeIds: [] };
      const expectedResult = {
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
          { field: 'title', operator: 'contains', type: 'string', value: 'Testint Title' },
        ],
      };
      expect(mountFilters(startDate, endDate, filters)).toEqual(expectedResult);
    });
  });

  describe('with only label filter', () => {
    it('returns only dates when label filter is blank', () => {
      const filters = { title: '', labelIds: [], assigneeIds: [] };
      expect(mountFilters(startDate, endDate, filters)).toEqual({
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
        ],
      });
    });

    it('returns only dates when label filter is present', () => {
      const filters = { title: '', labelIds: [1, 2, 3], assigneeIds: [] };
      const expectedResult = {
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
          { field: 'labels.id', operator: 'eq', type: 'number', value: '1' },
          { field: 'labels.id', operator: 'eq', type: 'number', value: '2' },
          { field: 'labels.id', operator: 'eq', type: 'number', value: '3' },
        ],
      };
      expect(mountFilters(startDate, endDate, filters)).toEqual(expectedResult);
    });
  });

  describe('with only assignee filter', () => {
    it('returns only dates when assignee filter is blank', () => {
      const filters = { title: '', labelIds: [], assigneeIds: [] };
      expect(mountFilters(startDate, endDate, filters)).toEqual({
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
        ],
      });
    });

    it('returns only dates when assignee filter is present', () => {
      const filters = { title: '', labelIds: [], assigneeIds: [4, 5, 6] };
      const expectedResult = {
        operator: 'and',
        queries: [
          { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
          { field: 'due_date', operator: 'lt', type: 'date', value: endDate },
          { field: 'assignees.id', operator: 'eq', type: 'number', value: '4' },
          { field: 'assignees.id', operator: 'eq', type: 'number', value: '5' },
          { field: 'assignees.id', operator: 'eq', type: 'number', value: '6' },
        ],
      };
      expect(mountFilters(startDate, endDate, filters)).toEqual(expectedResult);
    });
  });

  describe('with all filters', () => {
    const filters = { title: 'Testing Title', labelIds: [1, 2, 3, 4], assigneeIds: [5, 6, 7] };
    const expectedResult = {
      operator: 'and',
      queries: [
        { field: 'due_date', operator: 'gt', type: 'date', value: startDate },
        { field: 'due_date', operator: 'lt', type: 'date', value: endDate },

        { field: 'title', value: 'Testing Title', operator: 'contains', type: 'string' },
        { field: 'labels.id', value: '1', operator: 'eq', type: 'number' },
        { field: 'labels.id', value: '2', operator: 'eq', type: 'number' },
        { field: 'labels.id', value: '3', operator: 'eq', type: 'number' },
        { field: 'labels.id', value: '4', operator: 'eq', type: 'number' },

        { field: 'assignees.id', value: '5', operator: 'eq', type: 'number' },
        { field: 'assignees.id', value: '6', operator: 'eq', type: 'number' },
        { field: 'assignees.id', value: '7', operator: 'eq', type: 'number' },
      ],
    };
    expect(mountFilters(startDate, endDate, filters)).toEqual(expectedResult);
  });
});
