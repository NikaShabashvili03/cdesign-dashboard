import { useEffect, useMemo, useState } from 'react'
import type { SafeStage } from '../../types'
import { useStageStore } from '../../stores/stageStore'
import StageCard from './StageCard'
import clsx from 'clsx'
import StageCardSkeleton from './StageCardSkeleton'
import StageModal from './StageModal'
import { useTranslation } from 'react-i18next'

interface StageFeedProps {
    serviceId: number | undefined
}

function StageFeed({
    serviceId
}: StageFeedProps) {
    const { t } = useTranslation()
    const { data, loading, fetchStages } = useStageStore()

    const [selectedStage, setSelectedStage] = useState<SafeStage | null>(null)

    const progress = useMemo(() => {
        if (!data || data.length === 0) return 0
        const completed = data.filter(stage => stage.is_completed).length
        return Math.round((completed / data.length) * 100)
    }, [data])

    useEffect(() => {
        if(serviceId){
            fetchStages(serviceId)
        }
    }, [serviceId])

    return (
        <div className='w-full flex flex-col gap-5 justify-center'>
            <div className='flex border-b-2 border-main-color pb-5 justify-start w-full flex-col items-start gap-2'>
                <div className='flex font-bold w-full text-main-color text-sm justify-between'>
                    <span>{progress}%</span>
                    <span>100%</span>
                </div>
                <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-main-color h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    /> 
                </div>
            </div>
            <h2 className='px-6 text-main-color rounded-lg font-semibold py-2 bg-white w-fit'>{t("stages")}</h2>
            <div className={clsx(
                'md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full',
                data?.length !== 0 ? "flex flex-col sm:grid" : "flex flex-col items-center justify-center py-5"
            )}>
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <StageCardSkeleton key={i}/>
                    ))
                ) : (
                data.length !== 0 ?
                (
                    data?.map((stage) => (
                        <StageCard onSelectStage={() => setSelectedStage(stage)} key={stage.id} {...stage}/>
                    ))
                )
                : (
                    <h2 className='text-xl text-main-color font-semibold'>{t("empty_stages")}</h2>
                )
                )}
            </div>
            {selectedStage && <StageModal setSelectedStage={setSelectedStage} stage={selectedStage}/>}
        </div>
    )
}

export default StageFeed
