import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useRenovationStore } from "../stores/renovationStore"
import toast from "react-hot-toast"
import Loader from "../components/Loader"
import RenovationInfo from "../components/renovation/RenovationInfo"
import StageFeed from "../components/stages/StageFeed"


function RenovationSingle() {
    const { track } = useParams()
    const { singleData, loading, fetchRenovationSignle } = useRenovationStore()
    const nav = useNavigate()
    
    useEffect(() => {
        if(track){
            fetchRenovationSignle(track)
        }
    }, [track])

    useEffect(() => {
        if(singleData && !loading && !singleData?.service){
            toast.error("This renovation doesnot has service plase contact admin.")
            nav("/")
        }
    }, [singleData, loading])

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="w-full flex flex-col gap-5 py-5">
            <div className="flex items-center gap-5 justify-between">
                <Link className="px-6 py-2 font-semibold text-[#daded8] bg-[#4c583e] rounded-lg" to={'/'}>
                    Back
                </Link>
                <div className='px-6 py-2 lg:px-10 lg:py-4 bg-[#4c583e] rounded-xl w-fit'>
                    <h2 className='lg:text-2xl text-[#daded8] font-bold'>#{track}</h2>
                </div>
            </div>
            <RenovationInfo {...singleData!}/>
            <StageFeed serviceId={singleData?.service?.id}/>
        </div>
    )
}

export default RenovationSingle
