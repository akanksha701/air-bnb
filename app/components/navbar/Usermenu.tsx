'use client'
import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import Menuitem from './Menuitem'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const Usermenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const toggleOpen = () =>  setIsOpen(!isOpen)

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Airbnb your home
                </div>
                <div className='flex flex-row items-center gap-3 rounded-full p-4 md:py-1 border-[1px] hover:shadow-md  cursor-pointer  '>
                    <AiOutlineMenu />
                    <div className='hidden md:block' onClick={toggleOpen}>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <>
                    <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer'>
                            <Menuitem onClick={() => registerModal.onOpen()} label='Sign In' />
                            <Menuitem onClick={() => {}} label='Sign Up' />
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default Usermenu