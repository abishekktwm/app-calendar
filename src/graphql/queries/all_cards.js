// @flow

import gql from 'graphql-tag';

import cardFragment from '../fragments/card_fragment';

export default gql`
  query allCardsQuery($pipeId: ID!, $pageSize: Int!, $endCursor: String) {
    allCards(pipeId: $pipeId, first: $pageSize, after: $endCursor) {
      edges {
        node {
          ...cardFragment
        }
      }
    }
  }

  ${cardFragment}
`;
