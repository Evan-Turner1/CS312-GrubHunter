import { updateWishlist } from "@/mongoose/locations/services";

interface WishlistArgs {
  user_id: string;
  location_id: string;
}

export const locationMutationResolvers = {
  addWishlist: async (
    _parent: unknown,
    args: WishlistArgs,
    _context: {}
  ) => {
    return await updateWishlist(args.location_id, args.user_id, "add");
  },

  removeWishlist: async (
    _parent: unknown,
    args: WishlistArgs,
    _context: {}
  ) => {
    return await updateWishlist(args.location_id, args.user_id, "remove");
  },
};