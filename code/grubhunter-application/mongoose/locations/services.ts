import dbConnect from "@/middleware/db";
import LocationModel from "./model";
import type {
  FindLocationByIdParams,
  FindLocationsByIdParams,
  FindWishlistParams,
} from "./custom";

async function findLocations(filter = {}) {
  await dbConnect();
  return LocationModel.find(filter).lean();
}

export async function findAllLocations() {
  return findLocations({});
}

export async function findLocationById({ id }: FindLocationByIdParams) {
  await dbConnect();
  return LocationModel.findOne({ location_id: id }).lean();
}

export async function findLocationsById({ ids }: FindLocationsByIdParams) {
  return findLocations({ location_id: { $in: ids } });
}

export async function findWishlistLocations({ userId }: FindWishlistParams) {
  return findLocations({ on_wishlist: userId });
}

export async function updateWishlist(
  locationId: string,
  userId: string,
  action: "add" | "remove"
) {
  await dbConnect();

  const location = await LocationModel.findOne({ location_id: locationId });

  if (!location) {
    throw new Error("Location not found.");
  }

  const current = location.on_wishlist ?? [];

  if (action === "add") {
    if (!current.includes(userId)) {
      location.on_wishlist = [...current, userId];
    }
  } else {
    location.on_wishlist = current.filter((id: string) => id !== userId);
  }

  await location.save();
  return location.toObject();
}