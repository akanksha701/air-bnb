import { prisma } from '@/app/libs/prismadb';
interface IParams {
    userId?: string;
    listingId?: string;
    authorId?: string;
}

export async function getReservations(
    params: IParams
) {
    try {
        const { userId, listingId, authorId } = params;
        const query: IParams = {};
        if (userId) {
            query.userId = userId;
        }
        if (listingId) {
            query.listingId = listingId;
        }
        if (authorId) {
            query.userId = authorId;
        }
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: { createdAt: 'desc' }
        });
        const safeReservations = reservations.map((reservation: any) => ({
            ...reservation,
            createdAt: reservation?.createdAt?.toISOString(),
            startDate: reservation?.startDate?.toISOString(),
            endDate: reservation?.endDate?.toISOString(),
            listing: {
                ...reservation?.listing,
                createdAt: reservation?.listing?.createdAt?.toISOString(),
            },
        }));
        return safeReservations;
    } catch (error) {
        throw new Error(error as string);
    }
}