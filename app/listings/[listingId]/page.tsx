import getCurrentUser from '@/app/actions/getCurrentUser';
import { getListById } from '@/app/actions/getListById';
import EmptyState from '@/app/components/navbar/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import { getReservations } from '@/app/actions/getReservations';

interface IParams {
    listingId: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
    const { listingId } = params;
    const reservations = await getReservations({ listingId });
  
    if (!listingId) {
        return (
            <EmptyState 
                title="Invalid ID"
                subtitle="Please check the URL"
            />
        );
    }

    const listing = await getListById({ listingId });

    if (!listing) {
        return (
            <EmptyState 
                title="No listing found"
                subtitle="The listing you're looking for doesn't exist or has been removed"
            />
        );
    }

    // Convert the listing to safe format
    const safeListing = {
        ...listing,
        createdAt: listing.createdAt.toISOString(),
        user: {
            ...listing.user,
            createdAt: listing.user.createdAt.toISOString(),
            updatedAt: listing.user.updatedAt.toISOString(),
            emailVerified: 
                listing.user.emailVerified?.toISOString() || null
        }
    };

    const currentUser = await getCurrentUser();
    return (
        <div>
            <ListingClient
                listing={safeListing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </div>
    );
}