import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
const {signIn, loading} = useAuth()
const navigate = useNavigate()
  const onSubmit = async (data) => {
    const result = await signIn(data.email, data.password)
if(result.user.accessToken){
    // console.log(result.user.accessToken);
    navigate('/')
}
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">ClassSync</h2>
            <p className="text-base-content/60 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full focus:input-primary transition-colors ${errors.email ? 'input-error' : ''}`}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full focus:input-primary transition-colors pr-10 ${errors.password ? 'input-error' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                      message: "Password must be at least 8 characters, include an uppercase, a lowercase, and a symbol"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-primary transition-colors"
                >
                  {show ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
              {!errors.password && (
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-primary">
                    Forgot password?
                  </a>
                </label>
              )}
            </div>

            <button type="submit" className={`btn btn-primary w-full mt-2  ${loading && 'disabled:cursor-not-allowed disabled:opacity-70'}`}>
              {loading ? <FaSpinner size={20} /> : 'Sign In'}
            </button>
          </form>

          <div className="divider text-sm text-base-content/60">OR</div>

          <div className="text-center text-sm">
            <span className="text-base-content/70">Don't have an account? </span>
            <Link to="/register" className="link link-primary font-medium hover:text-primary-focus transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
