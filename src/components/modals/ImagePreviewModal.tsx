import { useImagePreview } from '../../hooks/useImagePreview'
import Modal from './Modal'


function ImagePreviewModal() {
    const { onClose, imageUrl, isOpen } = useImagePreview()

    let bodyContent = (
        <div className='w-full h-full flex justify-center items-center'>
            {imageUrl && <img className='object-cover' src={imageUrl} alt='Image'/>}
        </div>
    )

    return (
        <Modal
            onClose={onClose}
            size='fit'
            isOpen={isOpen}
            body={bodyContent}
        />
    )
}

export default ImagePreviewModal
