import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import {
  fetchEvents,
  deleteEvent,
  selectEvents,
  selectEventsLoading,
  selectEventsError,
  clearError,
  clearSuccess
} from '../../redux/reducers/EventSlice';
import {
  Users,
  Calendar,
  TicketCheck,
  DollarSign,
  Clock,
  Eye,
  Menu,
  X
} from 'lucide-react';

const AdminPanel = () => {
  const user = useSelector(state => state.auth);

  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const dispatch = useDispatch()

  // Mobile Sidebar State
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])
  // Mock data
  const [stats] = useState({
    totalEvents: 12,
    activeEvents: 5,
    totalAttendees: 2847,
    ticketsValidated: 1923,
    revenue: 45680
  });

  const [recentEvents] = useState([
    { id: 1, name: 'Tech Summit 2024', date: '2024-02-15', attendees: 450, capacity: 500, status: 'active', ticketsValidated: 320 },
    { id: 2, name: 'Music Festival', date: '2024-02-20', attendees: 890, capacity: 1000, status: 'active', ticketsValidated: 0 },
  ]);

  const statsCards = [
    { title: 'Total Events', value: stats.totalEvents, change: '+12%', icon: <Calendar size={20} />, textColor: 'text-indigo-600', lightColor: 'bg-indigo-50' },
    { title: 'Total Attendees', value: stats.totalAttendees.toLocaleString(), change: '+23%', icon: <Users size={20} />, textColor: 'text-emerald-600', lightColor: 'bg-emerald-50' },
    { title: 'Validated', value: stats.ticketsValidated.toLocaleString(), change: '+18%', icon: <TicketCheck size={20} />, textColor: 'text-blue-600', lightColor: 'bg-blue-50' },
    { title: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, change: '+31%', icon: <DollarSign size={20} />, textColor: 'text-purple-600', lightColor: 'bg-purple-50' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* 1. SIDEBAR WITH RESPONSIVE OVERLAY */}
      <div className={`fixed inset-0 z-40 lg:hidden bg-slate-900/50 backdrop-blur-sm transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setSidebarOpen(false)} />

      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0"> {/* min-w-0 prevents layout break */}

        {/* Responsive Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Hamburger Button for Mobile */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-600"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl md:text-3xl font-black text-slate-900">Dashboard</h1>
                <p className="hidden sm:block text-xs text-slate-500 font-medium">
                  Welcome back, <span className="text-indigo-600">{user?.displayName || 'Admin'}</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Today</p>
              <p className="text-xs md:text-sm font-black text-slate-900">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">

          {/* Stats Grid - Responsive Column Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.lightColor} p-2.5 rounded-xl ${stat.textColor}`}>
                    {stat.icon}
                  </div>
                  <div className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900">{stat.value}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Events List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900">Recent Events</h2>
                  <Link to="/admin/events" className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Eye size={18} />
                  </Link>
                </div>
                <div className="divide-y divide-slate-50">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h3 className="font-bold text-slate-900">{event.name}</h3>
                        <span className="w-fit px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">
                          {event.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock size={14} />
                          <span className="text-[11px] font-bold uppercase tracking-tight">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                          <Users size={14} />
                          <span className="text-[11px] font-bold uppercase tracking-tight">{event.attendees}/{event.capacity}</span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full transition-all"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions - Sidebar on desktop, stacks on mobile */}
            <div className="space-y-4">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Quick Actions</h2>
              {[
                { to: "/admin/events", label: "Create Event", color: "from-indigo-500 to-indigo-600", icon: <Calendar /> },
                { to: "/admin/validate", label: "Validate Tickets", color: "from-emerald-500 to-emerald-600", icon: <TicketCheck /> },
                { to: "/admin/attendees", label: "View Attendees", color: "from-purple-500 to-purple-600", icon: <Users /> }
              ].map((action, i) => (
                <Link
                  key={i}
                  to={action.to}
                  className={`flex items-center gap-4 p-5 bg-gradient-to-br ${action.color} text-white rounded-2xl shadow-lg shadow-indigo-100 hover:scale-[1.02] transition-transform`}
                >
                  <div className="bg-white/20 p-2 rounded-lg">{action.icon}</div>
                  <span className="font-bold text-sm">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;