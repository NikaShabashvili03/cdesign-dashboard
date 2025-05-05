import React, { useRef, useState } from 'react'
import type { SafeStage } from '../../types'
import clsx from 'clsx'
import { useStageStore } from '../../stores/stageStore';

function StageModal({
    stage,
    onClose
}: {
    stage: SafeStage | null,
    onClose: () => void;
}) {
    const { completeStage } = useStageStore()
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.currentTarget.files || []);
        setSelectedImages([...selectedImages, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviews]);
    };

    const createFormData = (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file); 
        });
        return formData;
    };

    const uploadImages = () => {
        const formData = createFormData(selectedImages);
        if(stage){
            completeStage(stage.id, formData, onClose);
            setSelectedImages([])
        }
    }

    const removePhoto = (index: number) => {
        const selectedImageName = selectedImages[index]?.name
        const newImages = Array.from(selectedImages).filter(image => image.name !== selectedImageName)
        setSelectedImages(newImages)
        setPreviewUrls(newImages.map((file) => URL.createObjectURL(file)));
    }

    return (
        <div className={clsx(
            'absolute w-full justify-center items-center h-full left-0 top-0 bg-gray-600/50',
            stage ? "flex" : "hidden"
        )}>
            <div className='w-full sm:w-3/4 lg:w-2/4 bg-white h-fit rounded-lg px-5 py-2.5'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className="font-semibold  text-[#4c583e] text-lg">
                        {stage?.name}
                    </h2>
                    <button onClick={onClose} className="px-4 cursor-pointer py-2 font-semibold text-[#daded8] bg-[#4c583e] rounded-lg">
                        X
                    </button>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <label className="block mb-2 text-2xl font-medium text-gray-700">აარჩიეთ სურათები</label>
                    <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={handleClick}
                        className="w-full text-xl border-dashed border-4 border-[#4c583e] text-[#4c583e] focus:ring-4 focus:outline-none cursor-pointer font-medium rounded-lg px-5 py-5 text-center"
                    >
                        Upload Images
                    </button>
                </div>
            </div>
                <div className="mt-4 overflow-x-auto whitespace-nowrap flex gap-x-4">
                    {stage?.images.map((img, index) => (
                        <div
                            key={index}
                            className="relative h-[300px] min-w-[300px] max-h-[300px] inline-block"
                        >
                            <img
                                src={import.meta.env.VITE_URL + img.url}
                                alt={`Selected ${index + 1}`}
                                className="w-full h-full object-cover rounded border"
                            />
                        </div>
                    ))}
                    {previewUrls.map((url, index) => (
                        <div
                            key={index}
                            className="relative h-[300px] min-w-[300px] max-h-[300px]  inline-block"
                        >
                            <img
                                src={url}
                                alt={`Selected ${index + 1}`}
                                className="w-full h-full object-cover rounded border"
                            />
                            <button
                                onClick={() => removePhoto(index)}
                                className="absolute top-2 left-2 bg-white p-2 rounded shadow text-sm"
                            >
                                X წაშლა
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <button disabled={stage?.images?.length == 0 && selectedImages?.length == 0} className="bg-[#4c583e] mt-10 flex disabled:bg-[#4c583ebe] justify-center items-center gap-x-2 text-white px-5 py-2.5 text-lg rounded-lg font-bold cursor-pointer" onClick={() => uploadImages()}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StageModal
