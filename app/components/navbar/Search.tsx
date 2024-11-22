'use client'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { differenceInDays } from 'date-fns';
const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');
  const locationLabel = getByValue(locationValue as string)?.label;
 const durationLabel = ()=>
 {
  if(startDate && endDate)
  {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    let diff = differenceInDays(end, start);
    if (diff === 0) {
      diff = 1;
    }
    return `${diff} Days`;
  }
  return 'Any Week';
 }
 const guestLabel = ()=>
 {
  if(guestCount)
  {
    return `${guestCount} Guests`;
  }
  return 'Add Guests';
 }

  return (
    <div
      onClick={() => searchModal.onOpen()}
      className='w-full md:w-auto border-[1px] py-2 shadow-sm hover:shadow-md rounded-full transition cursor-pointer'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-semibold px-6'>{locationLabel || 'Anywhere'}</div>
        <div
          className="hidden sm:block border-x-[1px] text-center flex-1 text-sm px-6 font-semibold"
        >
          {durationLabel()}
        </div>
        <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-2'>
          <div className='hidden sm:block'>{guestLabel()}</div>
          <div className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search