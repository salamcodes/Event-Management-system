import React from 'react';
import { Calendar, Mail, Github, Twitter, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Link
                                to="/"
                                className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
                            >
                                <span className="text-2xl font-black tracking-tight text-gray-900">
                                    Event<span className="text-indigo-600">opia</span>
                                </span>
                            </Link>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            The world's leading platform for creating, managing, and discovering unforgettable experiences.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://github.com/salamcodes" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://www.instagram.com/iamsalam_9/" className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-900 font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link to="/" className="hover:text-indigo-600 transition-colors">Find Events</Link></li>

                            <li><Link to="/mytickets" className="hover:text-indigo-600 transition-colors">My Tickets</Link></li>

                        </ul>
                    </div>


                    <div>
                        <h4 className="text-slate-900 font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-slate-900 font-bold mb-6">Stay Updated</h4>
                        <p className="text-sm text-slate-500 mb-4">Subscribe for event updates and early bird discounts.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                            <button className="mt-2 w-full bg-slate-900 text-white py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>


                <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs font-medium">
                        © 2026 Eventopia Inc. Built with ❤️ by Abdul Salam.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><MapPin size={12} /> Global</span>
                        <span className="flex items-center gap-1"><Mail size={12} /> abdulsalampk550@gmail.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;