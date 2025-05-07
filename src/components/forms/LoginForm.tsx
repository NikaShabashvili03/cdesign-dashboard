import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { i18n, t } = useTranslation()
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login, loading, error, isAuth } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    await login(data.email, data.password);
  };

  useEffect(() => {
    if (isAuth) {
      navigate(`/${i18n.language}`);
    }
  }, [isAuth, navigate]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-main-color">{t("email")}</label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="w-full text-main-color border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-main-color text-sm font-medium">{t("password")}</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="w-full text-main-color border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-main-color text-white py-2 rounded hover:bg-main-color/70 cursor-pointer"
        disabled={loading}
      >
        {loading ? t("logging_in") : t("login")}
      </button>
    </form>
  );
};

export default LoginForm;
