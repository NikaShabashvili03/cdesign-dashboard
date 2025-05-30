import React, { useEffect, useRef, useState } from 'react'
import type { SafeStage } from '../../types'
import clsx from 'clsx'
import { useStageStore } from '../../stores/stageStore';
import { useTranslation } from 'react-i18next';
import ImageIcon from '../../assets/icons/image-gallery.png'
import CloseImage from '../../assets/icons/close.png'
import { useImagePreview } from '../../hooks/useImagePreview';

function StageModal({
    stage,
    setSelectedStage,
}: {
    stage: SafeStage | null,
    setSelectedStage: any;
}) {
    const { t } = useTranslation()
    const { onOpen } = useImagePreview()
    const { uploadStageImages, completeStage, deleteStageImage } = useStageStore()
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
            uploadStageImages(stage.id, formData, setSelectedStage);
            setSelectedImages([])
            setPreviewUrls([])
        }
    }
    const onCompleteStage = () => {
        if(stage){
            completeStage(stage.id, setSelectedStage)
            setSelectedImages([])
            setPreviewUrls([])
        }
    }

    const onDeleteImage = (id: number) => {
        if(stage){
            deleteStageImage(id, setSelectedStage)
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
            'fixed overflow-y-auto w-full justify-center items-center h-full left-0 top-0 bg-gray-600/50',
            stage ? "flex" : "hidden"
        )}>
            <div className='w-full flex flex-col gap-5 sm:w-3/4 lg:w-2/4 bg-white h-fit rounded-lg px-5 py-2.5'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className="font-semibold  text-main-color text-lg">
                        {stage?.name}
                    </h2>
                    <button onClick={() => setSelectedStage(null)} className="px-4 cursor-pointer py-2 font-semibold text-secondary-color bg-main-color rounded-lg">
                        X
                    </button>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <label className="block mb-2 text-2xl font-medium text-gray-700">{t("choose_images")}</label>
                    <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {previewUrls.length === 0 
                        ? (
                            <button
                                type="button"
                                onClick={handleClick}
                                className="w-full text-xl border-dashed border-4 flex justify-center items-center border-main-color text-main-color focus:ring-4 focus:outline-none cursor-pointer font-medium rounded-lg px-5 py-5 text-center"
                            >
                                <img src={ImageIcon} alt={t("choose_images")} width={50} height={50} className='w-[50px] h-[50px]'/>
                            </button>
                        )
                        : (
                            <div className='w-full border-dashed grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-2 overflow-y-auto border-4 border-main-color h-[300px]'>
                                 <div>
                                    <button
                                        type="button"
                                        onClick={handleClick}
                                        className="w-full aspect-square text-xl border-4 flex justify-center items-center border-main-color text-main-color focus:ring-4 focus:outline-none cursor-pointer font-medium rounded-lg px-5 py-5 text-center"
                                    >
                                        <img src={ImageIcon} alt={t("choose_images")} width={50} height={50} className='w-[50px] h-[50px]'/>
                                    </button>
                                </div>
                                {previewUrls.map((url, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full aspect-square"
                                    >
                                        <button onClick={() => {
                                            onOpen(url);
                                        }} className='w-full h-full cursor-pointer object-cover rounded border'>
                                            <img
                                                src={url}
                                                alt={`Selected ${index + 1}`}
                                                className="w-full h-full object-cover rounded border"
                                            />
                                        </button>
                                        <button
                                            onClick={() => removePhoto(index)}
                                            className="absolute cursor-pointer top-2 left-2 border-main-color border bg-white p-2 rounded shadow"
                                        >
                                            <img src={CloseImage} alt='Close' width={20} height={20} className='w-[20px] h-[20px]'/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
                {stage?.images.length !== 0 && (
                    <div className='flex flex-col'>
                        <h2 className="block mb-2 text-2xl font-medium text-gray-700">{t("uploaded_images")}</h2>
                        <div className="mt-4 overflow-x-auto whitespace-nowrap flex gap-x-4">
                            {stage?.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative h-[250px] min-w-[250px] max-h-[250px] inline-block"
                                >
                                    <button onClick={() => onOpen(import.meta.env.VITE_URL + img.url)} className='w-full cursor-pointer h-full rounded border'>
                                        <img
                                            src={import.meta.env.VITE_URL + img.url}
                                            alt={`Selected ${index + 1}`}
                                            className="w-full h-full object-cover rounded border"
                                        />
                                    </button>
                                    
                                    <button
                                        onClick={() => onDeleteImage(img?.id)}
                                        className="absolute cursor-pointer top-2 left-2 border-main-color border bg-white p-2 rounded shadow"
                                    >
                                        <img src={CloseImage} alt='Close' width={20} height={20} className='w-[20px] h-[20px]'/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className='flex w-full justify-between items-center'>
                    <button disabled={selectedImages.length <= 0} className="bg-main-color disabled:cursor-not-allowed  mt-10 flex disabled:bg-main-color/70 justify-center items-center gap-x-2 text-white px-5 py-2.5 text-lg rounded-lg font-bold cursor-pointer" onClick={() => uploadImages()}>
                        {t("upload")}
                    </button>
                    <button 
                        disabled={stage?.images?.length === 0 && !stage.is_completed}
                        className={clsx(
                            "mt-10 flex justify-center items-center disabled:cursor-not-allowed gap-x-2 disabled:opacity-50 text-white px-5 py-2.5 text-lg rounded-lg font-bold cursor-pointer",
                            stage?.is_completed ? "bg-red-600" : "bg-main-color",
                        )} onClick={onCompleteStage}>
                            {stage?.is_completed ? t("cancel_completion") : t("complete")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StageModal


// {previewUrls.map((url, index) => (
//     <div
//         key={index}
//         className="relative h-[300px] min-w-[300px] max-h-[300px]  inline-block"
//     >
//         <img
//             src={url}
//             alt={`Selected ${index + 1}`}
//             className="w-full h-full object-cover rounded border"
//         />
//         <button
//             onClick={() => removePhoto(index)}
//             className="absolute cursor-pointer top-2 left-2 border-main-color border bg-white p-2 rounded shadow"
//         >
//             <img src={CloseImage} alt='Close' width={20} height={20} className='w-[20px] h-[20px]'/>
//         </button>
//     </div>
// ))}