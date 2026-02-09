import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, selectEvents } from '../../redux/reducers/EventSlice';
import { fetchEventTickets, selectTickets, selectTicketsLoading } from '../../redux/reducers/ticketSlice';
import { Users, Search, Mail, Phone, Calendar, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';

const AttendeeList = () => {
  const dispatch = useDispatch();

  const allEvents = useSelector(selectEvents);
  const attendees = useSelector(selectTickets);
  const isLoading = useSelector(selectTicketsLoading) === 'loading';

  const [selectedEventId, setSelectedEventId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (allEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(allEvents[0].id);
    }
  }, [allEvents, selectedEventId]);

  useEffect(() => {
    if (selectedEventId) {
      dispatch(fetchEventTickets(selectedEventId));
    }
  }, [selectedEventId, dispatch]);

  const filteredAttendees = attendees.filter(ticket =>
    ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      <Sidebar />

      {/* Content  */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden pt-4 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Attendees
              </h1>
              <p className="text-slate-500 font-medium text-sm md:text-base">Manage guests for your organized events.</p>
            </div>

          
            <div className="relative group w-full lg:w-80">
              <label className="absolute -top-2.5 left-4 bg-slate-50 px-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest z-10">
                Select Event
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="appearance-none bg-white border-2 border-slate-100 pl-5 pr-12 py-3.5 md:py-4 rounded-2xl font-bold text-slate-700 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all cursor-pointer shadow-sm w-full"
              >
                {allEvents.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.title || event.name}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={20} />
            </div>
          </div>

        
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search attendee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-none shadow-sm pl-14 pr-6 py-4 md:py-5 rounded-2xl md:rounded-3xl focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-medium text-sm md:text-base"
              />
            </div>
            <div className="bg-white px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-3xl shadow-sm flex items-center gap-4 border border-slate-50 self-start md:self-auto min-w-[160px]">
              <Users className="text-indigo-600" size={24} />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Registered</p>
                <p className="text-xl font-black text-slate-900 leading-none">{attendees.length}</p>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Guest</th>
                    <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Contact</th>
                    <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center whitespace-nowrap">Tickets</th>
                    <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Booking Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" className="py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Records...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAttendees.length > 0 ? (
                    filteredAttendees.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 md:px-8 py-5 md:py-6 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 text-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs md:text-sm shrink-0">
                              {ticket.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-none mb-1 text-sm md:text-base">{ticket.name}</p>
                              <p className="text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-tighter">REF: {ticket.id.substring(0, 10)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-5 md:py-6 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
                              <Mail size={12} className="text-slate-300" /> {ticket.email}
                            </div>
                            {ticket.phone && (
                              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
                                <Phone size={12} className="text-slate-300" /> {ticket.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-5 md:py-6 text-center whitespace-nowrap">
                          <span className="bg-slate-900 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-black">
                            {ticket.quantity || 1}
                          </span>
                        </td>
                        <td className="px-6 md:px-8 py-5 md:py-6 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 font-bold uppercase tracking-tighter">
                            <Calendar size={12} />
                            {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-24 text-center">
                        <p className="text-slate-300 font-bold italic">No attendees found for this event.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendeeList;