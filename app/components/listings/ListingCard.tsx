'use client';
import useCountries from '@/app/hooks/useCountries';
import {  useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Buttons from '../navbar/Buttons';
import { SafeReservation, SafeUser, SafeListing } from '@/app/types';
interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard = ({ data, currentUser, reservation, actionId='' , onAction, disabled, actionLabel }: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onAction?.(actionId);
  }, [disabled, onAction, actionId]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            alt='Listing'
            src={data.imageSrc} 
            fill
            className='w-full h-full object-cover transition group-hover:scale-110'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
      <div className='font-semibold text-lg'>
        {location?.region}, {location?.label}
      </div>
      <div className='font-light text-neutral-500'>
        {reservationDate || ''}
      </div>
      <div className='flex flex-row items-center gap-1'>
        <div className='font-semibold'>
          $ {price}
        </div>
        {!reservation && (
          <div className='font-light text-neutral-500'>
            night
          </div>
        )}
      </div>
      {onAction && actionLabel && (
        <Buttons
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  )
}

export default ListingCard