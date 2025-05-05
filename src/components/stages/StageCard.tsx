import clsx from "clsx"
import type { SafeStage } from "../../types"


interface StageCardProps extends SafeStage {
    onSelectStage: () => void;
}

function StageCard({
    is_completed,
    name,
    onSelectStage
}: StageCardProps) {
    return (
        <button onClick={onSelectStage} className='w-full gap-5 cursor-pointer rounded-lg flex flex-col py-3.5 px-5 h-fit bg-white shadow-2xl'>
            <div className='flex w-full items-center justify-between'>
                <h2>{name}</h2>
                <p className={clsx(
                    'text-sm  px-4 py-2 rounded-lg font-semibold text-[#daded8]',
                    is_completed ? "bg-[#4c583e]" : " bg-red-500"
                )}>{is_completed ? "Completed" : "Not Completed"}</p>
            </div>
        </button>
    )
}

export default StageCard
