import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'student'
    }
  });

const {register: signup, loading: authLoading}= useAuth()

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    const result = await signup(data.email, data.password)
    if (result) {
      console.log('Register attempt with:', data);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Join ClassSync</h2>
            <p className="text-base-content/60 mt-2">Create an account to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Role Selection */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">I am a...</span>
              </label>
              <div className="flex gap-4">
                <label className={`flex-1 flex cursor-pointer rounded-lg border p-4 transition-all ${selectedRole === 'student' ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-base-300 hover:border-primary/50'}`}>
                  <input
                    type="radio"
                    value="student"
                    className="radio radio-primary hidden"
                    {...register('role')}
                  />
                  <div className="flex flex-col items-center justify-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <span className="font-semibold text-base-content">Student</span>
                  </div>
                </label>
                <label className={`flex-1 flex cursor-pointer rounded-lg border p-4 transition-all ${selectedRole === 'teacher' ? 'border-secondary bg-secondary/10 ring-2 ring-secondary/20' : 'border-base-300 hover:border-secondary/50'}`}>
                  <input
                    type="radio"
                    value="teacher"
                    className="radio radio-secondary hidden"
                    {...register('role')}
                  />
                  <div className="flex flex-col items-center justify-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-base-content">Teacher</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`input input-bordered w-full focus:input-primary transition-colors ${errors.name ? 'input-error' : ''}`}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full focus:input-primary transition-colors ${errors.email ? 'input-error' : ''}`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
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
              <input
                type="password"
                placeholder="Create a password"
                className={`input input-bordered w-full focus:input-primary transition-colors ${errors.password ? 'input-error' : ''}`}
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                    message: "Password must be at least 8 characters, include an uppercase, a lowercase, and a symbol"
                  }
                })}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
            </div>

            <button type="submit" className={`btn w-full mt-4 ${selectedRole === 'teacher' ? 'btn-secondary' : 'btn-primary'}`}>
              {authLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="divider text-sm text-base-content/60">OR</div>

          <div className="text-center text-sm">
            <span className="text-base-content/70">Already have an account? </span>
            <Link to="/login" className="link link-primary font-medium hover:text-primary-focus transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
