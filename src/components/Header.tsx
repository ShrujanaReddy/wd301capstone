import React from "react";

const Header = () => {
  return (
    <nav className="bg-gray-200 py-4">
      <div className="mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="text-4xl font-bold mb-4">Sports Center</h1>
            <p className="text-lg text-gray-600">Welcome to the Sports application!</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;