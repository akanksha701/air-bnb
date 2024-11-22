'use client';
import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types';
import Heading from '../components/navbar/Heading';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
    currentUser?: SafeUser | null;
    listings: SafeListing[];
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
const router = useRouter();
const [deletingId, setDeletingId] = useState('');

const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`)
    .then(()=>{
        toast.success('Property deleted');
        router.refresh();
    })
    .catch((error)=>{
        toast.error(error?.response?.data?.message);
    })
    .finally(()=>{
        setDeletingId('');
    })
}, [router]);
  return (
  <Container >
    <div className='flex flex-col gap-4'>
        <Heading
            title='Properties'
            subtitle='List of your properties'
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {listings.map((listing)=>(
              <ListingCard
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLabel='Delete property'
                currentUser={currentUser}
              />
            ))}
        </div>
    </div>
  </Container>
  )
}

export default PropertiesClient