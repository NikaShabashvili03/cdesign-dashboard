import { useTranslation } from 'react-i18next'
import ChangePassword from '../components/settings/ChangePassword'
import Divider from '../components/Divider'


function Settings() {
    const { t } = useTranslation()

    return (
        <div className='w-full flex flex-col gap-5 py-5'>
            <div className='px-10 py-4 bg-main-color rounded-xl w-fit'>
                <h2 className='text-2xl text-secondary-color font-bold'>{t("settings")}</h2>
            </div>
            <div className='flex w-full flex-col h-fit'>
                <Divider/>
                <ChangePassword/>
                <Divider/>
            </div>
        </div>
    )
}

export default Settings
