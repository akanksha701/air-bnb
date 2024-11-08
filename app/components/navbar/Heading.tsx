import React from 'react'

interface HeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
}

const Heading = (props: HeadingProps) => {
    const { title, subtitle, center } = props;
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p className='font-light text-neutral-500 mt-2'>{subtitle}</p>
        </div>
  )
}

export default Heading