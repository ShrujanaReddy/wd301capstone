// NotFound.tsx
import React from 'react';

const Notfound: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">404 - Not Found</h1>
        <p className="text-center">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default Notfound;