import React from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');

      const responseData = await response.json();
      localStorage.setItem('authToken', responseData.auth_token);
      localStorage.setItem('userData', JSON.stringify(responseData.user));
      console.log(responseData.user)
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign-in failed:', error);
      //setError('submit', { message: 'Sign-in failed. Please check your credentials.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input id="email" type="email" {...register('email', { required: 'Email is required' })} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input id="password" type="password" {...register('password', { required: 'Password is required' })} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 mb-4">Sign In</button>
      {errors.root && <p className="text-red-500">{errors.root?.message}</p>}
    </form>
  );
};

export default SigninForm;