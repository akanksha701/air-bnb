import React from 'react'
import Image from 'next/image';
interface AvatarProps {
    src: string | null;
   
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
    src={src || '/images/placeholder.png'}
    height={30}
    width={30}
    className='rounded-full'
    alt=''
    />
  )
}

export default Avatar