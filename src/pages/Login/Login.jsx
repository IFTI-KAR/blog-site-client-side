import React, { use, useContext, useState } from 'react';
import Lottie from 'lottie-react';
import login_lottie from '../../assets/lotties/Login.json'; // Add a login animation
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { useNavigate } from 'react-router';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signInUser}=use(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError('');

    signInUser( email, password)
      .then(result => {
        console.log('Logged in:', result.user);
        navigate('/'); // Redirect after login
      })
      .catch(err => {
        console.error(err);
        setError('Invalid email or password.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl w-full">
        {/* Lottie Animation */}
        <div className="w-[500px]">
          <Lottie animationData={login_lottie} loop={true} />
        </div>

        {/* Login Form */}
        <div className="card bg-[#1e1e1e] text-white w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center mb-4 text-black">Login</h1>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold text-black">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered bg-white text-black"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text font-semibold text-black">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered bg-white text-black"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

              {/* Submit Button */}
              <button className="btn btn-neutral w-full mt-4">Login</button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-400">
              Don’t have an account?{' '}
              <a href="/register" className="font-semibold hover:underline text-black">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
