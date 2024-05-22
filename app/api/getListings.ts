import { NextApiRequest, NextApiResponse } from "next";
import getListings, { IListingsParams } from "@/app/actions/getListings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params: IListingsParams = req.query;
  try {
    const listings = await getListings(params);
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
}
