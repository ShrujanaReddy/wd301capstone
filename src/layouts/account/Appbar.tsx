import { useState, useContext, Fragment, useEffect } from 'react'
import { Switch, Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon, SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import Logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"
import { ThemeContext } from "../../context/theme";



const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    setIsUserSignedIn(!!localStorage.getItem('authToken'));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsUserSignedIn(false);
  };
  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {({ }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12"
                    src={Logo}
                    alt="Sports icon"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-between items-center">
                  <h1 className="text-4xl font-bold mb-2">Sports Center</h1>
                  <p className="text-lg text-gray-600 text-center">Welcome to the Sports application!</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center rounded-full h-10 w-10">
                    <button aria-pressed={isDark} onClick={toggleTheme}>
                    {theme === 'light' ? <MoonIcon className="h-6 w-6 hover:text-blue-600" /> : <SunIcon className="h-6 w-6 hover:text-blue-600" />}
                    </button>
                </div>
                {isUserSignedIn && (
                  <Cog6ToothIcon className="h-7 w-7 text-black ml-2 hover:text-blue-600" aria-hidden="true" />
                )}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="rounded-full bg-white p-1 text-black hover:text-blue-600">
                      <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {isUserSignedIn ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/logout"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={handleSignOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/signin"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign in
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  )
}

export default Appbar;
