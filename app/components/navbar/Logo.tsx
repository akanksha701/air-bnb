'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
const Logo = () => {
    const router = useRouter()
  return (
    <>
    <Image
    src='/images/logo.png'
    alt='Logo'
    height={100}
    width={100}
    />
    </>
  )
}

export default Logo