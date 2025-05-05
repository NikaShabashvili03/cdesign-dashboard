import { useState } from 'react'
import Logo from '../assets/icons/logo.png'
import Placeholder from '../assets/icons/placeholder.png'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import clsx from 'clsx'

function Header() {
    const [dropDown, setDropDown] = useState(false)
    const { logout, user } = useAuthStore()

    return (
        <div className='w-full h-[10dvh] py-2 bg-[#4c583e] '>
            <div className='mx-auto px-2 lg:px-10 gap-5 flex justify-between items-center w-full h-full'>
                <Link to={'/'} className='flex justify-center gap-4 items-center'>
                    <img src={Logo} className='w-[100px] h-[80px]' width={100} height={80} alt='logo'/>
                    <h2 className='text-[#daded8] font-bold text-xl'>Calligraphy Dashboard</h2>
                </Link>
                <div className='relative'>
                    <button onClick={() => setDropDown(!dropDown)} className='p-1 bg-white rounded-full cursor-pointer'>
                        <img width={30} height={30} className='object-cover' src={Placeholder} alt='placeholder'/>
                    </button>
                    <div className={clsx(
                        "absolute shadow-2xl -right-0 z-50",
                        dropDown ? "block" : "hidden"
                    )}>
                        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                            <div className="px-4 py-3">         
                                <p className="text-sm text-gray-500 leading-5">Signed in as</p>
                                <p className="text-sm font-medium leading-5 text-[#4c583e] truncate">{user?.email}</p>
                            </div>
                            <div className="py-1">
                                <button onClick={logout} className="text-gray-700 cursor-pointer flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  >Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
