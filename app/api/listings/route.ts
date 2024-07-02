import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";

// GET method to fetch listings
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params: IListingsParams = {
    userId: searchParams.get("userId") || undefined,
    guestCount: searchParams.get("guestCount")
      ? parseInt(searchParams.get("guestCount")!)
      : undefined,
    roomCount: searchParams.get("roomCount")
      ? parseInt(searchParams.get("roomCount")!)
      : undefined,
    bathroomCount: searchParams.get("bathroomCount")
      ? parseInt(searchParams.get("bathroomCount")!)
      : undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    locationValue: searchParams.get("locationValue") || undefined,
    category: searchParams.get("category") || undefined,
    skip: searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0,
    take: searchParams.get("take") ? parseInt(searchParams.get("take")!) : 10,
  };

  try {
    const listings = await getListings(params);
    return NextResponse.json(listings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching listings" },
      { status: 500 }
    );
  }
}

// POST method to create a new listing
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the listing" },
      { status: 500 }
    );
  }
}
