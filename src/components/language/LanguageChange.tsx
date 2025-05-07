import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const supportedLanguages = ['en', 'ka', 'ru'];

const LanguageChange = () => {
  const { i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const changeLanguage = (lng: string) => {
    const parts = pathname.split('/');
    parts[1] = lng;
    navigate(parts.join('/'));
    // Avoid page reload by removing window.location.reload
    window.location.reload()
  };

  const toggleLanguage = () => setOpen(!isOpen)

  return (
    <>
      <button onClick={toggleLanguage} className={clsx(
        'min-w-[60px] py-2 font-semibold cursor-pointer text-[#4c583e] bg-white',
        isOpen ? "rounded-t-lg border-b-2 border-[#4c583e] " : "rounded-lg"
      )}>
        {i18n.language.toUpperCase()}
      </button>   
      <div className={clsx(
        'min-w-[60px] flex-col bg-white z-40 absolute top-[100%] rounded-b-lg right-0 border-4 border-white',
        isOpen ? "flex" : "hidden"
      )}>
        {supportedLanguages.map((lang, i) => {
          if(lang === i18n.language) return;
          return (
            <button onClick={() => changeLanguage(lang)} className='text-[#4c583e] font-semibold cursor-pointer py-1 hover:bg-[#4c583e] hover:text-white w-full' key={i}>{lang.toUpperCase()}</button>
          )
        })}
      </div>
    </>
  );
};

export default LanguageChange;
