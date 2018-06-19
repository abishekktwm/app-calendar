// @flow

import gql from 'graphql-tag';

import cardFragment from '../fragments/card_fragment';

export default gql`
  query cardSearchQuery(
    $organizationId: ID!,
    $filter: OrganizationCardsFilter,
    $pipeIds: [Int]!,
    $sortBy: ReportSortDirectionInput!,
    $pagination: ReportPaginationInput!,
    $partialPipeAccess: Boolean
  ) {
    cardSearch(
      organizationId: $organizationId,
      filter: $filter,
      pipeIds: $pipeIds,
      sortBy: $sortBy,
      pagination: $pagination,
      partialPipeAccess: $partialPipeAccess
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
