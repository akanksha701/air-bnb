import React from 'react'

interface AvatarProps {
    src: string | null;
   
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <img
    src={src || '/images/placeholder.png'}
    height={30}
    width={30}
    className='rounded-full'
    />
  )
}

export default Avatar