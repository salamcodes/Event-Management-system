import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/authSlice';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();


    const { status, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = { email, password };
        console.log(credentials)
        dispatch(login(credentials))


        setEmail('');
        setPassword('')
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header Section */}
                <div className="bg-linear-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center text-white">
                    <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
                    <p className="mt-2 text-indigo-100">Manage your events with ease</p>
                </div>

                <div className="px-8 py-10">
                    {/* Error Message Alert */}
                    {status === 'failed' && (
                        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                            <span className="font-bold">Login Failed:</span> {error?.message || "Invalid credentials"}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <button type="button" className="text-xs font-semibold text-indigo-600 hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* show password */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">
                                Show Password
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full flex justify-center items-center rounded-lg py-3 font-bold text-white shadow-md transition-all active:scale-[0.98] ${status === 'loading'
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                                }`}
                        >
                            {status === 'loading' ? (
                                <>
                                    <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Social Login Divider */}
                    {/* <div className="relative my-8 text-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <span className="relative bg-white px-4 text-xs uppercase text-gray-400 font-medium tracking-wider">or continue with</span>
                    </div> */}

                    {/* Footer Link */}
                    <div className="text-center text-sm text-gray-500 ">
                        Don't have an account?{' '}
                        <button className="font-bold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                            <Link to={'/signup'} >
                                Create one
                            </Link>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;