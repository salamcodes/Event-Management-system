import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import {
  fetchEvents,
  deleteEvent,
  selectEvents,
  selectEventsLoading,
  selectEventsError,
} from '../../redux/reducers/EventSlice';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { logout } from '../../redux/reducers/authSlice';

const ManageEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const handleAddEvent = () => {
    navigate('/admin/events/add');
  };

  const handleViewEvent = (eventId) => {
    navigate(`/admin/events/${eventId}`);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      await dispatch(deleteEvent(eventToDelete.id));
      setShowDeleteModal(false);
      setEventToDelete(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCapacityPercentage = (attendees, capacity) => {
    if (!capacity) return 0;
    return Math.round((attendees / capacity) * 100);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar remains fixed */}
      <Sidebar handleLogout={handleLogout} />

      {/* Scrollable Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Header  */}
        <header className="bg-white border-b border-slate-200 z-10">
          <div className="px-4 md:px-8 py-4 md:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">Manage Events</h1>
                <p className="text-xs md:text-sm text-slate-500">
                  Create, edit, and organize your events
                </p>
              </div>
              <button
                onClick={handleAddEvent}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all hover:shadow-lg text-sm md:text-base"
              >
                <Plus size={18} />
                Add Event
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* Search and Filter  */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>


              <div className="relative w-full lg:w-48">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white outline-none transition-all appearance-none font-medium text-slate-700"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

         
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm font-medium">
              {error.message}
            </div>
          )}

      
          {loading === 'loading' ? (
            <div className="text-center py-24">
              <div className="inline-block w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 mt-4 font-bold text-xs uppercase tracking-widest">Fetching Events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group relative">
                  {/* Event Image */}
                  <div className="relative h-40 bg-slate-200 overflow-hidden">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                        <Calendar size={40} className="text-indigo-200" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>

                    
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === event.id ? null : event.id); }}
                        className="bg-white/90 backdrop-blur p-2 rounded-lg hover:bg-white shadow-sm transition-all"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeDropdown === event.id && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-30">
                          <button onClick={() => handleViewEvent(event.id)} className="w-full px-4 py-2 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <Eye size={14} /> View
                          </button>
                          <button onClick={() => handleDeleteClick(event)} className="w-full px-4 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                 
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-4 line-clamp-1">{event.name}</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <Calendar size={14} className="text-indigo-500" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <MapPin size={14} className="text-indigo-500" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <Users size={14} className="text-indigo-500" />
                        {event.attendees || 0} / {event.capacity || 0} Guests
                      </div>
                    </div>

                  
                    <div className="mt-5">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-1.5">
                        <span>Fill Rate</span>
                        <span className="text-slate-900">{getCapacityPercentage(event.attendees, event.capacity)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 transition-all duration-500"
                          style={{ width: `${getCapacityPercentage(event.attendees, event.capacity)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-dashed border-slate-300 p-12 text-center">
              <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-500 font-bold">No events matching your criteria.</p>
            </div>
          )}
        </main>
      </div>

      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trash2 size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-900 text-center mb-2">Delete Event?</h2>
            <p className="text-slate-500 text-center text-sm mb-8">This will permanently remove <span className="text-slate-900 font-bold">"{eventToDelete?.name}"</span>.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={confirmDelete} className="py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

     
      {activeDropdown && <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />}
    </div>
  );
};

export default ManageEvents;