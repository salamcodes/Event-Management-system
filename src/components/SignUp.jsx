import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/reducers/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const dispatch = useDispatch();


    const { status, error } = useSelector((state) => state.auth);

    function handleSubmit(e) {
        e.preventDefault();
        const userData = { name, email, password };
        dispatch(signUp(userData));

        navigate('/login')

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header Section */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center text-white">
                    <h1 className="text-3xl font-extrabold tracking-tight">Get Started</h1>
                    <p className="mt-2 text-blue-100">Join our event management community</p>
                </div>

                <div className="px-8 py-10">

                    {status === 'failed' && (
                        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                            <span className="font-bold">Error:</span> {error?.message || "Something went wrong"}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="xyz@example.com"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Create a strong password"
                            />
                        </div>

                        {/* Submit Button*/}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full flex justify-center items-center rounded-lg py-3 font-bold text-white shadow-md transition-all active:scale-[0.98] cursor-pointer ${status === 'loading'
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                                }`}
                        >
                            {status === 'loading' ? (
                                <>
                                    <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already Registered?{' '}
                        <button className="font-bold text-indigo-600 hover:text-indigo-500">
                            <Link to={'/login'} >
                                Log in
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;