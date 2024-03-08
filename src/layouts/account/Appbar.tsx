import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"

const userNavigation = [
  { name: 'Sign out', href: '/logout' },
]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const { pathname } = useLocation()

//   const navigation = [
//     { name: 'Projects', href: '/account/projects', current: false },
//     { name: 'Members', href: '/account/members', current: false },
//   ]

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-250">
        {({ open }) => (
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
              <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon className="h-10 w-10" aria-hidden="true" />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                            {({ active }) => (
                                <a
                                href={item.href}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                                >
                                {item.name}
                                </a>
                            )}
                            </Menu.Item>
                        ))}
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