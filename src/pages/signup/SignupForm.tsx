import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/constants';

type Inputs = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.userName,
        email: data.userEmail,
        password: data.userPassword
      }),
    });

    if (!response.ok) {
      throw new Error('Sign-up failed');
    }

    console.log('Sign-up successful');
    const responseData = await response.json();
    localStorage.setItem('authToken', responseData.auth_token);
    localStorage.setItem('userData', JSON.stringify(responseData.user));
    navigate('/dashboard');
  } catch (error) {
    console.error('Sign-up failed:', error);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Your Name:</label>
        <input
          id="userName"
          type="text"
          {...register('userName', { required: 'Your Name is required' })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          id="userEmail"
          type="email"
          {...register('userEmail', { required: 'Email is required' })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input
          id="userPassword"
          type="password"
          {...register('userPassword', { required: 'Password is required' })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 mb-4"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;