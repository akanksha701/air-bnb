'use client'
import React from 'react'
import Logo from './Logo'
import Container from '../Container'
import Search from './Search'
import UserMenu from './Usermenu'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import GlobalError from '@/app/global-error'
import { SafeUser } from '@/app/types'
import Categories from './Categories'

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  console.log("Navbar currentUser:", currentUser);
  
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <ErrorBoundary errorComponent={GlobalError}>
              <Search />
            </ErrorBoundary>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar