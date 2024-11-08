'use client'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='w-full md:w-auto border-[1px] py-2 shadow-sm hover:shadow-md rounded-full transition cursor-pointer'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-semibold px-6'>Anywhere</div>
        <div
          className="hidden sm:block border-x-[1px] text-center flex-1 text-sm px-6 font-semibold"
        >
          Any week
        </div>
        <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-2'>
          <div className='hidden sm:block'>Add guests</div>
          <div className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search