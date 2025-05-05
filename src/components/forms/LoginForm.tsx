import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login, loading, error, isAuth } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    await login(data.email, data.password);
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-[#4c583e]">Email</label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="w-full text-[#4c583e] border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-[#4c583e] text-sm font-medium">Password</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="w-full text-[#4c583e] border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#4c583e] text-white py-2 rounded hover:bg-[#4c583ec5] cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
