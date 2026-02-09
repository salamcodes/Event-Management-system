import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import {
  fetchEvents,
  selectEvents,
  selectEventsLoading,
  selectEventsError,
} from '../../redux/reducers/EventSlice.js';

import {
  Users,
  Calendar,
  TicketCheck,
  DollarSign,
  Clock,
  Eye,
  Menu,
  TrendingUp
} from 'lucide-react';

const AdminPanel = () => {
  const user = useSelector(state => state.auth);
  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const dispatch = useDispatch();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);


  const totalAttendees = events.reduce((acc, curr) => acc + (Number(curr.attendees) || 0), 0);
  const totalRevenue = events.reduce((acc, curr) => acc + ((Number(curr.attendees) || 0) * (Number(curr.price) || 0)), 0);
  const ticketsValidated = events.reduce((acc, curr) => acc + (Number(curr.ticketsValidated) || 0), 0);

  const statsCards = [
    { title: 'Total Events', value: events.length, icon: <Calendar size={20} />, textColor: 'text-indigo-600', lightColor: 'bg-indigo-50' },
    { title: 'Total Attendees', value: totalAttendees.toLocaleString(), change: '+23%', icon: <Users size={20} />, textColor: 'text-emerald-600', lightColor: 'bg-emerald-50' },
    { title: 'Validated', value: ticketsValidated.toLocaleString(), icon: <TicketCheck size={20} />, textColor: 'text-blue-600', lightColor: 'bg-blue-50' },
    { title: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} />, textColor: 'text-purple-600', lightColor: 'bg-purple-50' },
  ];


  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-slate-50">

      <div className={`fixed inset-0 z-40 lg:hidden bg-slate-900/50 backdrop-blur-sm transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setSidebarOpen(false)} />

      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-600">
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                <p className="hidden sm:block text-xs text-slate-500 font-medium">
                  Welcome back, <span className="text-indigo-600 font-bold">{user?.user?.displayName || 'Admin'}</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Today</p>
              <p className="text-xs md:text-sm font-black text-slate-900">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.textColor} p-3 rounded-2xl ${stat.lightColor}`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    <TrendingUp size={10} /> {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-7 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Recent Events</h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">Real-time performance of your latest events</p>
                  </div>
                  <Link to="/admin/events" className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                    <Eye size={20} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-50">
                  {loading === 'loading' ? (
                    <div className="p-12 text-center text-slate-400 font-bold uppercase text-xs tracking-widest animate-pulse">Syncing events...</div>
                  ) : recentEvents.length > 0 ? (
                    recentEvents.map((event) => (
                      <div key={event.id} className="p-7 hover:bg-slate-50/50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                          <div>
                            <h3 className="font-black text-slate-800 text-lg leading-tight">{event.title || event.name}</h3>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold uppercase tracking-tight">
                                <Clock size={14} className="text-indigo-500" />
                                {event.date || "No Date"}
                              </span>
                              <span className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold uppercase tracking-tight">
                                <Users size={14} className="text-indigo-500" />
                                {event.attendees} / {event.capacity}
                              </span>
                            </div>
                          </div>
                          <span className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status === 'upcoming' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                            {event.status || 'Active'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Attendance Rate</span>
                            <span className="text-slate-900">{Math.round((event.attendees / event.capacity) * 100) || 0}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full transition-all duration-1000"
                              style={{ width: `${Math.min((event.attendees / event.capacity) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-400 font-bold italic">No events created yet.</div>
                  )}
                </div>
              </div>
            </div>


            <div className="space-y-4">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Management</h2>
              {[
                { to: "/admin/events", label: "Create Event", color: "from-indigo-600 to-indigo-700", shadow: "shadow-indigo-100", icon: <Calendar size={20} /> },
                { to: "/admin/validate", label: "Validate Tickets", color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-100", icon: <TicketCheck size={20} /> },
                { to: "/admin/attendees", label: "View Attendees", color: "from-slate-800 to-slate-900", shadow: "shadow-slate-200", icon: <Users size={20} /> }
              ].map((action, i) => (
                <Link
                  key={i}
                  to={action.to}
                  className={`flex items-center gap-4 p-5 bg-gradient-to-br ${action.color} text-white rounded-[1.5rem] shadow-xl ${action.shadow} hover:translate-x-1 transition-all duration-300`}
                >
                  <div className="bg-white/20 p-2.5 rounded-xl">{action.icon}</div>
                  <span className="font-black text-sm uppercase tracking-wide">{action.label}</span>
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