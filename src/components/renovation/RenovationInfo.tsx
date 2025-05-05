import StartDateIcon from '../../assets/icons/start_date.png'
import EndDateIcon from '../../assets/icons/end_date.png'
import UserIcon from '../../assets/icons/user.png'
import LocationIcon from '../../assets/icons/location.png'
import ServiceIcon from '../../assets/icons/service_white.png'
import type { SafeRenovation } from '../../types'

function RenovationInfo({
    customer,
    address,
    start_date,
    end_date,
    service
}: SafeRenovation) {
    return (
        <div className='flex flex-col gap-5 lg:flex-row'>
            <ul className='text-base rounded-xl border-2 px-3.5 py-2 bg-white border-[#4c583e] h-full flex flex-col gap-2 lg:flex-row justify-between items-center w-full lg:w-2/5'>
               <li className='flex justify-center items-center gap-2'>
                    <img className='w-5 h-5' src={LocationIcon} alt='Location'/>
                    <span className='font-bold text-[#4c583e]'>
                        {address!}
                    </span>
               </li>
               <li className='flex justify-center items-center gap-2'>
                    <img className='w-5 h-5' src={UserIcon} alt='User'/>
                    <span className='font-bold text-[#4c583e]'>
                        {customer?.firstname!} {customer?.lastname!}
                    </span>
               </li>
            </ul>
            <div className='flex justify-center w-full lg:w-1/5 items-center'>
                <div className='w-full h-full py-2 flex justify-center items-center gap-2 rounded-lg bg-[#4c583e]'>
                    <img className='w-5 h-5' src={ServiceIcon} alt='Service'/>
                    <span className='font-bold text-xl text-[#daded8]'>
                        {service?.name! || "Not Found"}
                    </span>
                </div>
            </div>
            <ul className='text-base rounded-xl border-2 px-3.5 py-2 bg-white border-[#4c583e] h-full flex flex-col gap-2 lg:flex-row justify-between items-center w-full lg:w-2/5'>
               <li className='flex justify-center items-center gap-2'>
                    <img className='w-5 h-5' src={StartDateIcon} alt='StartDate'/>
                    <span className='font-bold text-[#4c583e]'>
                        {start_date!}
                    </span>
               </li>
               <li className='flex justify-center items-center gap-2'>
                    <img className='w-5 h-5' src={EndDateIcon} alt='EndDate' />
                    <span
                        className={`font-bold ${
                            new Date() > new Date(end_date)
                                ? 'text-red-600'
                                : 'text-[#4c583e]'
                        }`}
                    >
                        {end_date}
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default RenovationInfo
