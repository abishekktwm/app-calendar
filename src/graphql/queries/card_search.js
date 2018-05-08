// @flow

import gql from 'graphql-tag';

import cardFragment from '../fragments/card_fragment';

export default gql`
  query cardSearchQuery(
    $organizationId: ID!,
    $filter: OrganizationCardsFilter,
    $pipeIds: [Int]!,
    $sortBy: ReportSortDirectionInput!,
    $pagination: ReportPaginationInput!
  ) {
    cardSearch(
      organizationId: $organizationId,
      filter: $filter,
      pipeIds: $pipeIds,
      sortBy: $sortBy,
      pagination: $pagination
    ) {
      cards {
        ...cardFragment
      }
      count
      nextPage
      __typename
    }
  }
  ${cardFragment}
`;
