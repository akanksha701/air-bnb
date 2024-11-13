'use server';
import React from 'react'
import EmptyState from '../components/navbar/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import { getFavouriteListings } from '../actions/getFavouriteListings';
import FavouritesClient from './FavouritesClient';

const FavouritesPage = async () => {
    const currentUser = await getCurrentUser();
    const listings: any = await getFavouriteListings();
    if (listings.length === 0) {
        return (
            <EmptyState
                title='No favourites found'
                subtitle='Looks like you have no favourite listings'
            />
        )
    }
    return (
        <FavouritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default FavouritesPage