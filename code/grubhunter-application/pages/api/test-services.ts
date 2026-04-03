import type { NextApiRequest, NextApiResponse } from "next";
import { findAllLocations } from "@/mongoose/locations/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const locations = await findAllLocations();
    return res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load locations." });
  }
}