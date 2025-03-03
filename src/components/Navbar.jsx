import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logojet-removebg-preview 1.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../assets/profile-icon-design-free-vector.jpg';
import LoadingBar from 'react-top-loading-bar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isLogin, setLogin] = useState(false);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    setLogin(!!refreshToken);
  }, [token]);

  const kausanFontStyle = {
    fontFamily: 'Kausan Script, cursive',
    color: 'white',
    fontSize: '24px',
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: false },
    { name: 'Explore', href: '/explore', current: false },
    { name: 'Discover', href: '/discover', current: false },
  ]);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const [Log, setLog] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, [isLogin]);

  useEffect(() => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
    setNavigation(updatedNavigation);
  }, [location.pathname]);

  const [progress, setProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigationClick = (href) => {
    setProgress(40);
    setIsNavigating(true);
    setTimeout(() => {
      setProgress(100);
      setIsNavigating(false);
      navigate(href);
    }, 1000); 
  };

  return (
    <>
      <LoadingBar color="#ffff" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Disclosure as="nav" className="bg-gray-800 font-sans">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/" className="hidden sm:block justify-center">
                      <img className="h-12 mt-3 w-auto" src={logo} alt="Your Company" />
                    </Link>
                    <Link to="/" className="text-white items-center hidden sm:block">
                      <h3 className="text-white" style={kausanFontStyle}>
                        journey jett
                      </h3>
                    </Link>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <div className="hidden sm:block">
                      <div className="flex space-x-4 mt-3 md:space-x-10 gap-12 justify-center">
                        {navigation.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleNavigationClick(item.href)}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {Log ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={img} alt="" />
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
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={() => handleNavigationClick("/profile")}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={logout}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button
                      className="text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
                      onClick={() => handleNavigationClick("/login")}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() => handleNavigationClick(item.href)}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
