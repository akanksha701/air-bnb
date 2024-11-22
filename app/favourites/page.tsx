'use server';
import React from 'react'
import EmptyState from '../components/navbar/EmptyState';
import { getFavouriteListings } from '../actions/getFavouriteListings';
import FavouritesClient from './FavouritesClient';
import getCurrentUser from '../actions/getCurrentUser';
import { SafeListing } from '../types';

const FavouritesPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavouriteListings();
    if (listings?.length === 0) {
        return (
            <EmptyState
                title='No favourites found'
                subtitle='Looks like you have no favourite listings'
            />
        )
    }
    return (
        <FavouritesClient
            listings={listings as SafeListing[]}
            currentUser={currentUser}
        />
    )
}

export default FavouritesPage