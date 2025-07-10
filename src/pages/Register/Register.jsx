import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import register_lottie from '../../assets/lotties/Register.json';
import { AuthContext } from '../../context/AuthContext/AuthCotext';
import { updateProfile } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one capital letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one numeric character.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return ''; // ✅ No error
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photoURL.value;
    const password = form.password.value;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome! You have successfully registered.',
          confirmButtonColor: '#22c55e',
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        console.log('Registration Error:', error);
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Signed in with Google successfully.',
          confirmButtonColor: '#22c55e',
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 max-w-5xl w-full">
        <div className="w-[500px]">
          <Lottie animationData={register_lottie} loop={true} />
        </div>

        <div className="card bg-[#1e1e1e] text-white w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center mb-4 text-black">Register Now!</h1>

            <form onSubmit={handleRegister}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold text-black">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input input-bordered bg-white text-black"
                  required
                />
              </div>

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

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold text-black">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered bg-white text-black"
                />
              </div>

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

              {/* 🔴 Show validation error */}
              {error && (
                <div className="text-red-500 text-sm mt-1 font-medium">{error}</div>
              )}

              <button className="btn btn-neutral w-full mt-4">Register</button>
            </form>

            <div className="divider text-gray-400">or</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline text-black w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-center text-sm mt-6 text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="font-semibold hover:underline text-black">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
