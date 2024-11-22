import {prisma} from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

export async function getListById(params: IParams) {
    try {
        const { listingId } = params;
        
        if (!listingId) {
            return null;
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        return listing;

    } catch (error) {
        console.log(error)
    }
}