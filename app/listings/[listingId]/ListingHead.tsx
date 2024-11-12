'use client'

import Heading from '@/app/components/navbar/Heading';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react'
import Image from 'next/image';
import HeartButton from '@/app/components/HeartButton';
interface ListingHeadProps {
    title: string;
    imageSrc: string | null;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead = ({ title, imageSrc, locationValue, id, currentUser }: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
    return (
    <>
    <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
    />
    <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
            alt='Image'
            src={imageSrc || ''}
            fill
            className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
            <div className='flex flex-row items-center gap-2 text-white'>
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </div>
    </>
  )
}

export default ListingHead