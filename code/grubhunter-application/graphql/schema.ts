import gql from "graphql-tag";
import { locationCustomType } from "./locations/custom.gql";
import { locationQueryType } from "./locations/queries.gql";
import { locationMutationType } from "./locations/mutations.gql";

export const typeDefs = gql`
  ${locationCustomType}

  type Query {
    ${locationQueryType}
  }

  type Mutation {
    ${locationMutationType}
  }
`;