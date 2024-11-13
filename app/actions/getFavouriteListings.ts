import { prisma } from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getFavouriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }
        const favourites = await prisma.listing.findMany({
            where: {
                id: { in: [...(currentUser.favoritesIds)] }
            }
        });
        const safeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createdAt: favourite.createdAt.toISOString(),
        }));
        return safeFavourites;
    } catch (error) {
        console.log(error);
    }
}