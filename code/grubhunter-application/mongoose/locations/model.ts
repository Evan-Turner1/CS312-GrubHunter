import mongoose, { Model } from "mongoose";
import { LocationSchema, Location } from "./schema";

const LocationModel: Model<Location> =
  (mongoose.models.Location as Model<Location>) ||
  mongoose.model<Location>("Location", LocationSchema);

export default LocationModel;