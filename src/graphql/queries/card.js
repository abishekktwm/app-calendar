// @flow

import gql from 'graphql-tag';

import cardFragment from '../fragments/card_fragment';

export default gql`
  query card($id: ID!) {
    card(id:$id) {
    ...cardFragment
    }
  }
  ${cardFragment}
`;
