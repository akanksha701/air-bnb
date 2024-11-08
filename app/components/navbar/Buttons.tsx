'use client'
import React from 'react'
import { IconType } from 'react-icons'
interface ButtonProps{
    label:string;
    onClick:()=>void;
    Icon?:IconType;  
    outline?:boolean;
    disabled?:boolean;  
    small?:boolean;
}
const Buttons = (props:ButtonProps) => {
    const {label,onClick,Icon,outline,disabled,small} = props;
  return (
  <button onClick={onClick} 
  disabled={disabled}
  className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
  ${outline ? 'bg-white' : 'bg-rose-500'}
  ${outline ? 'border-black' : 'border-rose-500'}
  ${outline ? 'text-black' : 'text-white'}
  ${small ? 'py-1' : 'py-3'}
  ${small ? 'font-light' : 'font-semibold'}
  ${small ? 'border-[1px]' : 'border-2'}
  `}>
    {Icon && (
        <Icon size={24} className='absolute left-4 top-1/2 -translate-y-1/2'/>
    )}
    {label}
  </button>
  )
}

export default Buttons