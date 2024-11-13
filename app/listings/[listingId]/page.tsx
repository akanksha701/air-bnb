import getCurrentUser from '@/app/actions/getCurrentUser';
import { getListById } from '@/app/actions/getListById';
import EmptyState from '@/app/components/navbar/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';




const ListingPage = async ({ params }: { params: { listingId?: string } }) => {
    const currentUser = await getCurrentUser();
   
        if (!params.listingId) {
            return (
                <EmptyState 
                    title="Invalid ID"
                    subtitle="Please check the URL"
                />
            );
        }

        const listing:any = await getListById({ listingId: params.listingId });

        if (!listing) {
            return (
                <EmptyState 
                    title="No listing found"
                    subtitle="The listing you're looking for doesn't exist"
                />
            );
        }

        return (
            <div>
                <ListingClient
                    listing={listing}
                    currentUser={currentUser}
                />
            </div>
        );
   
}

export default ListingPage