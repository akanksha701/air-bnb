import { prisma } from "../libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
export interface IQuery {
  userId?: string;
  category?: string;
  guestCount?: {
    gte: number;
  };
  roomCount?: {
    gte: number;
  };
  bathroomCount?: {
    gte: number;
  };
  locationValue?: string;
  NOT?: {
    reservations: {
      some: {
        OR: Array<{ startDate: string; endDate: string } | { startDate: { lte: string }; endDate: { gte: string } }>;
      };
    };
  };
}
export default async function getListings(params: IListingsParams) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params;
    const query: IQuery = {};
    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [{ startDate, endDate }, { startDate: { lte: endDate }, endDate: { gte: startDate } }]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany(
      {
        where: query,
        orderBy: {
          createdAt: 'desc'
        }
      }
    );
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }));
    return safeListings;
  } catch (error) {
  console.log(error)
  }
}