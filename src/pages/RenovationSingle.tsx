import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useRenovationStore } from "../stores/renovationStore"
import toast from "react-hot-toast"
import Loader from "../components/Loader"
import RenovationInfo from "../components/renovation/RenovationInfo"
import StageFeed from "../components/stages/StageFeed"
import { useTranslation } from "react-i18next"


function RenovationSingle() {
    const { track } = useParams()
    const { t, i18n } = useTranslation()
    const { singleData, loading, fetchRenovationSignle } = useRenovationStore()
    const nav = useNavigate()
    
    useEffect(() => {
        if(track){
            fetchRenovationSignle(track)
        }
    }, [track])

    useEffect(() => {
        if(singleData && !loading && !singleData?.service){
            toast.error(`${t("service_not_selected")}! ${t("contact_admin")}`)
            nav(`/${i18n}`)
        }
    }, [singleData, loading])

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="w-full flex flex-col gap-5 py-5">
            <div className="flex items-center gap-5 justify-between">
                <Link className="px-6 py-2 font-semibold text-secondary-color bg-main-color rounded-lg" to={`/${i18n.language}`}>
                    {t("back")}
                </Link>
                <div className='px-6 py-2 lg:px-10 lg:py-4 bg-main-color rounded-xl w-fit'>
                    <h2 className='lg:text-2xl text-secondary-color font-bold'>#{track}</h2>
                </div>
            </div>
            <RenovationInfo {...singleData!}/>
            <StageFeed serviceId={singleData?.service?.id}/>
        </div>
    )
}

export default RenovationSingle
