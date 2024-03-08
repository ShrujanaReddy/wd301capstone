import { UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <nav className="bg-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Sports Center</h1>
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <p className="text-lg text-gray-600 text-center">Welcome to the Sports application!</p>
      </div>
    </nav>
  );
};

export default Header;
