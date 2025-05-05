import clsx from "clsx"
import type { SafeStage } from "../../types"


function StageCardSkeleton() {
    return (
        <div className='w-full gap-5 rounded-lg flex flex-col py-3.5 px-5 h-fit bg-white shadow-2xl animate-pulse'>
            <div className='flex w-full items-center justify-between'>
                <div className='h-5 w-1/3 bg-gray-300 rounded'></div>
                <div className='h-8 w-24 bg-gray-300 rounded-lg'></div>
            </div>
        </div>
    )
}

export default StageCardSkeleton
