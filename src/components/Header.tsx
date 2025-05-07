import { useState } from 'react'
import Logo from '../assets/icons/logo.png'
import Placeholder from '../assets/icons/placeholder.png'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import clsx from 'clsx'
import LanguageChange from './language/LanguageChange'
import { useTranslation } from 'react-i18next'

function Header() {
    const [dropDown, setDropDown] = useState(false)
    const { logout, user } = useAuthStore()
    const { t, i18n } = useTranslation()

    return (
        <div className='w-full h-fit py-2 bg-main-color '>
            <div className='mx-auto sm:px-2 lg:px-10 sm:gap-5 flex justify-between items-center w-full h-full'>
                <Link to={`/${i18n.language}`} className='flex justify-center flex-col md:flex-row md:gap-4 items-center'>
                    <img src={Logo} className='w-[120px] h-[80px]' width={120} height={80} alt='logo'/>
                </Link>
                <div className='flex justify-center items-center gap-5'>
                    <div className='relative'>
                        <LanguageChange/>
                    </div>
                    <div className='relative'>
                        <button onClick={() => setDropDown(!dropDown)} className='p-1 bg-white rounded-full cursor-pointer'>
                            <img width={30} height={30} className='object-cover w-[30px] h-[30px]' src={Placeholder} alt='placeholder'/>
                        </button>
                        <div className={clsx(
                            "absolute shadow-2xl -right-0 z-50",
                            dropDown ? "block" : "hidden"
                        )}>
                            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                                <div className="px-4 py-3">         
                                    <p className="text-sm text-gray-500 leading-5">{t("signed_in_as")}</p>
                                    <p className="text-sm font-medium leading-5 text-main-color truncate">{user?.email}</p>
                                </div>
                                <div className="py-1">
                                    <button onClick={logout} className="text-gray-700 cursor-pointer flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  >{t("logout")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
