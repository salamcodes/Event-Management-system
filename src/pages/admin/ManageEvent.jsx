import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Clock,
  MoreVertical,
  Eye,
  CheckCircle2,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import { logOut } from '../../redux/reducers/authSlice';

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
    await dispatch(logOut());
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
  console.log(events)

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar handleLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-1">Manage Events</h1>
                <p className="text-sm text-slate-500">
                  Create, edit, and organize your events
                </p>
              </div>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Plus size={20} />
                Add New Event
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none bg-white font-medium text-slate-700"
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm font-medium">{error.message}</p>
            </div>
          )}

          {/* Loading State */}
          {loading === 'loading' && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 mt-4 font-medium">Loading events...</p>
            </div>
          )}

          {/* Empty State */}
          {loading === 'succeeded' && filteredEvents.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">No Events Found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first event'}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={handleAddEvent}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                >
                  Create Your First Event
                </button>
              )}
            </div>
          )}

          {/* Events Grid */}
          {loading === 'succeeded' && filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Event Image */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar size={48} className="text-white opacity-50" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === event.id ? null : event.id)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors"
                      >
                        <MoreVertical size={18} className="text-slate-700" />
                      </button>

                      {activeDropdown === event.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20">
                          <button
                            onClick={() => handleViewEvent(event.id)}
                            className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleEditEvent(event.id)}
                            className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Edit size={16} />
                            Edit Event
                          </button>
                          <hr className="my-2 border-slate-100" />
                          <button
                            onClick={() => handleDeleteClick(event)}
                            className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete Event
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {event.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        <span className="font-medium truncate">{event.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-medium">
                          {event.attendees || 0}/{event.capacity || 0}
                        </span>
                      </div>

                      {event.price > 0 && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <DollarSign size={16} className="text-slate-400" />
                          <span className="font-medium">${event.price}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {event.capacity > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500">Capacity</span>
                          <span className="text-xs font-bold text-slate-700">
                            {getCapacityPercentage(event.attendees, event.capacity)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${getCapacityPercentage(event.attendees, event.capacity)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Delete Event?</h2>
            <p className="text-slate-600 text-center mb-6">
              Are you sure you want to delete <span className="font-bold">"{eventToDelete?.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};

export default ManageEvents;