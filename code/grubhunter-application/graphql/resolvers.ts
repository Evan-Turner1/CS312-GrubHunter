import { locationQueryResolvers } from "./locations/queries";
import { locationMutationResolvers } from "./locations/mutations";

export const resolvers = {
  Query: {
    ...locationQueryResolvers,
  },
  Mutation: {
    ...locationMutationResolvers,
  },
};