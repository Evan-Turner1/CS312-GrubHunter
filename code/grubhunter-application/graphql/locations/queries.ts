import {
  findAllLocations,
  findLocationsById,
  findWishlistLocations,
} from "@/mongoose/locations/services";

interface LocationsByIdArgs {
  location_ids: string[];
}

interface OnUserWishlistArgs {
  user_id: string;
}

export const locationQueryResolvers = {
  allLocations: async () => {
    return await findAllLocations();
  },

  locationsById: async (_parent: unknown, args: LocationsByIdArgs) => {
    return await findLocationsById({ ids: args.location_ids });
  },

  onUserWishlist: async (_parent: unknown, args: OnUserWishlistArgs) => {
    return await findWishlistLocations({ userId: args.user_id });
  },
};