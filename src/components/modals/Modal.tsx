import clsx from 'clsx';
import React, { type ReactElement } from 'react'
import CloseIcon from '../../assets/icons/close.png'

interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    body: ReactElement,
    size: 'full' | '1/2' | 'fit'
}

function Modal({
    onClose,
    isOpen,
    body,
    size = "full"
}: ModalProps) {
    return (
        <div className={clsx(
            'z-50 w-full fixed left-0 md:p-5 top-0 h-full bg-gray-800/50',
            isOpen ? "flex justify-center items-center" : "hidden"
        )}>
            <div className={clsx(
                "bg-white rounded-lg p-2",
                size === 'full' && "w-full h-full",
                size === 'fit' && "w-fit h-fot min-w-full relative min-h-2/4 md:min-h-full overflow-y-auto max-w-full max-h-full"
            )}> 
                <div className='w-full flex justify-end'>
                    <button onClick={onClose} className='cursor-pointer fixed'>
                        <img src={CloseIcon} alt='Close' width={50} height={50} className='w-[50px] h-[50px]' />
                    </button>
                </div>
                {body}
            </div>
        </div>
    )
}

export default Modal
