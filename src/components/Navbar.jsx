import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    function handleLogout() {
        dispatch(logOut())
    }

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">


                    <Link
                        to="/"
                        className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
                    >
                        <span className="text-2xl font-black tracking-tight text-gray-900">
                            Event<span className="text-indigo-600">opia</span>
                        </span>
                    </Link>


                    <div className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors duration-200 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : 'text-gray-600'
                                }`
                            }
                        >
                            Explore Events
                        </NavLink>

                        <NavLink
                            to="/mytickets"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors duration-200 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : 'text-gray-600'
                                }`
                            }
                        >
                            My Tickets
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors duration-200 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : 'text-gray-600'
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </div>


                    <div className="hidden md:flex items-center gap-5">
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-1 rounded-full border border-gray-200 hover:border-indigo-300 transition-all duration-200 bg-gray-50">
                                    <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm">
                                        <img
                                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 mr-1">{user?.name?.split(' ')[0]}</span>
                                    <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Attendee Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-100 overflow-hidden">
                                    <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Profile Settings</Link>
                                    <Link to="/" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Booked Events</Link>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-rose-600 font-medium hover:bg-rose-50 transition-colors cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-indigo-600 text-white px-7 py-2.5 rounded-full font-bold hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-indigo-100"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${open ? 'max-h-screen border-t' : 'max-h-0'}`}>
                <div className="px-4 py-6 space-y-3">
                    <NavLink to="/" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:bg-indigo-50">Explore Events</NavLink>
                    <NavLink to="/mytickets" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:bg-indigo-50">My Tickets</NavLink>
                    <NavLink to="/about" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:bg-indigo-50">About Us</NavLink>

                    <div className="pt-4 border-t border-gray-100 mt-4">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="block w-full py-3 bg-indigo-600 text-white text-center font-bold rounded-xl"
                            >
                                Get Started
                            </Link>
                        ) : (
                            <button
                                onClick={() => { handleLogout(); setOpen(false); }}
                                className="block w-full py-3 bg-rose-50 text-rose-600 text-center font-bold rounded-xl"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;