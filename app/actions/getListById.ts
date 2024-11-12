import {prisma} from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

export default async function getListById(params: IParams) {
    try {
        if (!params || !params.listingId) {
            throw new Error("Invalid ID");
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: params.listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        return listing;

    } catch (error: any) {
        throw new Error(error);
    }
}