import React from 'react'

const Menuitem = (props: { onClick: () => void, label: string }) => {
    
    return (
        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold' onClick={props.onClick}>
            {props.label}
        </div>
    )
}

export default Menuitem