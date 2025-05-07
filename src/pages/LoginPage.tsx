import { useTranslation } from 'react-i18next';
import LoginForm from '../components/forms/LoginForm';
import LanguageChange from '../components/language/LanguageChange';

const LoginPage = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#daded8]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className='flex justify-between'>
          <h2 className="text-2xl text-[#4c583e] font-bold mb-4 text-center">{t("login")}</h2>
          <div className='relative'>
            <LanguageChange/>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
