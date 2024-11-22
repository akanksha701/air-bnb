'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface IQuery {
  category?: string; // Add other properties as needed
  [key: string]: string | string[] | null | undefined; // Update this line to allow string arrays
}

interface CategoryBoxProps {
  label: string
  icon: IconType
  selected?: boolean;
  description?: string;

}


const CategoryBox = (props: CategoryBoxProps) => {
  const { label, icon: Icon, selected } = props
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = () => {
    let currentQuery: IQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString()) as IQuery;
    }

    const updatedQuery: IQuery = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    try {
      const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
      }, { skipNull: true });

      router.push(url); // Add this line to navigate
    } catch (error) {
      console.error("Error creating URL:", error); // Log the error for debugging
    }
  }
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}
      ${selected ? 'font-medium' : 'font-normal'}
      `}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>
        {label}
      </div>
    </div>
  )
}

export default CategoryBox