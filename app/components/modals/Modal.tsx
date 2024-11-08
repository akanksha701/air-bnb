import React from 'react'
import { IoMdClose } from 'react-icons/io';
import Buttons from '../navbar/Buttons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body: React.ReactElement;
    footer: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryLabel?: string;
    secondaryAction?: () => void;
}
const Modal = (props: ModalProps) => {
    const { isOpen, onClose, onSubmit, title, body, footer, actionLabel, secondaryLabel, secondaryAction } = props;
    if (!isOpen) {
        return null;
    }
    else {
        return (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70 outline-none overflow-x-hidden overflow-y-auto'>
                <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto h-auto lg:h-[95vh]'>
                    <div className={`transition duration-300 ease-in-out h-full ${isOpen ? 'translate-y-0' : 'translate-y-full'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className='translate h-full border-0 shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/* header */}
                            <div className='flex items-center p-6 rounded-t justify-center border-b-[1px] relative'>
                                <button
                                    onClick={onClose}
                                    className='p-1 border-0 hover:opacity-70 transition absolute right-9'><IoMdClose size={18} /></button>
                                <div className='text-lg font-semibold'>{title}</div>
                            </div>
                            {/* body */}
                            <div className='relative p-6 flex-auto'>
                                {body}
                            </div>
                            {/* footer */}
                            <div className='flex flex-col gap-2 p-6'>
                                <div className='flex items-center gap-2 p-6'>
                                    <div className='flex flex-row items-center gap-4 w-full'>
                                        {secondaryLabel && secondaryAction && (
                                            <>
                                                <Buttons outline label={secondaryLabel} onClick={secondaryAction} />
                                            </>
                                        )}
                                        <Buttons label={actionLabel} onClick={onSubmit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal