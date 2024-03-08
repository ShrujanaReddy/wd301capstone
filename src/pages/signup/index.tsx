import React from 'react';
import SignupForm from "./SignupForm"
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSigninClick = () => {
    navigate('/signin'); 
  };
  const handleGuestClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="px-12 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign up</h1>
        <SignupForm />
        <a className="text-center block mb-2 hover:underline hover:cursor-pointer" onClick={handleSigninClick}>Already have an account? Signin here!</a>
        <h2 className="text-center mb-2">or</h2>
        <a className="text-center block mb-4 hover:underline hover:cursor-pointer" onClick={handleGuestClick}>View as guest</a>
      </div>
    </div> 
  );
}
export default Signup;