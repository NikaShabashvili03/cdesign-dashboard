import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import i18n from '../../i18n';

const LanguageWrapper = () => {
  const { lng } = useParams();

  useEffect(() => {
    if (lng) {
      i18n.changeLanguage(lng); 
    }
  }, [lng]);

  return <Outlet/>;
};

export default LanguageWrapper;
