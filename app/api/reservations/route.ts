import {prisma} from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const {
        totalPrice,
        startDate,
        endDate,
        listingId,
    } = body;

    if (!totalPrice || !startDate || !endDate || !listingId) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);

}