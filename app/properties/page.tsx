'use server';

import React from 'react'
import Container from '../components/Container';
import Heading from '../components/navbar/Heading';
import ListingCard from '../components/listings/ListingCard';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import EmptyState from '../components/navbar/EmptyState';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getListings({
        userId: currentUser?.id
    });
    if (listings.length === 0) {
        return (
            <EmptyState
                title='No properties found'
                subtitle='Looks like you have no properties'
            />
        )
    }
  return (
        <Container> 
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </Container>
      )
}

export default PropertiesPage