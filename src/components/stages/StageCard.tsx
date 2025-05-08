import clsx from "clsx"
import type { SafeStage } from "../../types"
import { useTranslation } from "react-i18next";


interface StageCardProps extends SafeStage {
    onSelectStage: () => void;
}

function StageCard({
    is_completed,
    name,
    onSelectStage
}: StageCardProps) {
    const { t } = useTranslation()
    return (
        <button onClick={onSelectStage} className='min-w-full w-fit min-h-[80px] cursor-pointer rounded-lg flex flex-col items-center justify-center py-3.5 px-5 h-full bg-white shadow-2xl'>
            <div className='flex w-full gap-2 h-full items-center justify-between'>
                <h2 className="text-start font-semibold">{name}</h2>
                <p className={clsx(
                    'text-sm px-4 py-2 rounded-lg font-semibold text-secondary-color',
                    is_completed ? "bg-main-color" : " bg-red-500"
                )}>{is_completed ? t("completed") : t("not_completed")}</p>
            </div>
        </button>
    )
}

export default StageCard
