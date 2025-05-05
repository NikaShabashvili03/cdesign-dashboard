import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#daded8]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-[#4c583e] font-bold mb-4 text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
