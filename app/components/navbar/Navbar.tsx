'use client'
import React from 'react'
import Logo from './Logo'
import Container from '../Container'
import Search from './Search'
import Usermenu from './Usermenu'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import GlobalError from '@/app/global-error'

const Page = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <ErrorBoundary errorComponent={GlobalError}>
            <Search />
            </ErrorBoundary>
           
              <Usermenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Page