import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authSlice';
import {
    LayoutDashboard,
    Users,
    TicketCheck,
    CalendarPlus,
    LogOut,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Sidebar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    function handleLogout() {
        dispatch(logout());
        navigate('/');
        setIsMobileMenuOpen(false);
    }

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, desc: 'Overview & Stats' },
        { name: 'Manage Events', path: '/admin/events', icon: <CalendarPlus size={20} />, desc: 'Add, Edit, Delete' },
        { name: 'Attendee List', path: '/admin/attendees', icon: <Users size={20} />, desc: 'Per Event Tracking' },
        { name: 'Validate Tickets', path: '/admin/validate', icon: <TicketCheck size={20} />, desc: 'QR Scan / Manual' },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg border border-slate-200"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          w-72 h-screen lg:h-auto bg-white border-r border-slate-200 flex flex-col
          fixed lg:sticky top-0 z-40
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Branding */}
                <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl">

                        </div>
                        <div>
                            <h1 className="text-xl font-black">Admin</h1>
                            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">
                                Organizer Panel
                            </p>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `flex items-center justify-between p-4 rounded-2xl group transition ${isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <div className="flex items-center gap-4">
                                {item.icon}
                                <div>
                                    <p className="font-bold text-sm">{item.name}</p>
                                    <p className="text-[10px] opacity-70">{item.desc}</p>
                                </div>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-4 text-rose-500 hover:bg-rose-50 rounded-2xl font-bold cursor-pointer"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>

                {/* Profile */}
                <div className="m-4 p-4 bg-slate-900 rounded-2xl text-white">
                    <div className="flex items-center gap-3">
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                            className="w-8 h-8 rounded-full object-cover"
                            alt="Profile"
                        />
                        <div>
                            <p className="text-sm font-bold truncate">{user?.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
