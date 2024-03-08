import React from 'react';
import Appbar from '../../layouts/account/Appbar';
const Dashboard: React.FC = () => {
  return (
    <>
    <Appbar />
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
    </div>
    </>
  );
}

export default Dashboard;