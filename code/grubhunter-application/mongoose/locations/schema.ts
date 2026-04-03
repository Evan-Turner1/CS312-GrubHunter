import { InferSchemaType, Schema } from "mongoose";

export const LocationSchema = new Schema(
  {
    address: String,
    street: String,
    zipcode: String,
    borough: String,
    cuisine: String,
    grade: String,
    name: String,
    on_wishlist: {
      type: [String],
      default: [],
    },
    location_id: String,
  },
  {
    timestamps: true,
    collection: "locations",
  }
);

export type Location = InferSchemaType<typeof LocationSchema>;