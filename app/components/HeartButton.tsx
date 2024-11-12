'use client';
import React from 'react'
import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavourite from '../hooks/useFavourite';

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
   
}

const HeartButton = ({listingId, currentUser}: HeartButtonProps) => {
    const {toggleFavorite, hasFavorited} = useFavourite({listingId, currentUser});   
        
    return (
    <div
    onClick={toggleFavorite}
    className='relative hover:opacity-80 transition cursor-pointer'>
        <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
        />
        <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
        />
    </div>
  )
}

export default HeartButton