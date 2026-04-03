import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/middleware/db";
import LocationModel from "@/mongoose/locations/model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const locations = await LocationModel.find({}).lean();
    return res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load locations." });
  }
}