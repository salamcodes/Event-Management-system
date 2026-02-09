import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    MapPin,
    Users,
    DollarSign,
    Image as ImageIcon,
    Calendar,
    Clock,
    Activity
} from 'lucide-react';
import { addEvent, clearSuccess, clearError } from '../redux/reducers/EventSlice';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector(state => state.events);

    const [eventName, setEventName] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate()

    const eventData = {
        name: eventName,
        organizer,
        date,
        time,
        location,
        capacity: Number(capacity),
        price: Number(price),
        status,
        imageUrl,
        description,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEvent(eventData)).then((res) => {
            if (!res.error) {
                setEventName('');
                setOrganizer('');
                setDate('');
                setTime('');
                setLocation('');
                setCapacity('');
                setPrice('');
                setStatus('');
                setImageUrl('');
                setDescription('');
            }
            navigate('/admin/events')
        });
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(clearSuccess());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

            {success && (
                <div className="mx-8 mt-6 p-4 rounded-2xl bg-green-50 text-green-700 font-bold text-sm">
                    ✅ Event added successfully!
                </div>
            )}

            {error && (
                <div className="mx-8 mt-6 p-4 rounded-2xl bg-red-50 text-red-700 font-bold text-sm">
                    ❌ {error.message || 'Something went wrong'}
                </div>
            )}

            <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                <h2 className="text-xl font-black text-slate-900">Event Details</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                    Complete the fields below to launch your event
                </p>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Event Name</label>
                        <input
                            type="text"
                            required
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="e.g. Tech Summit 2026"
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Organizer Name</label>
                        <input
                            type="text"
                            required
                            value={organizer}
                            onChange={(e) => setOrganizer(e.target.value)}
                            placeholder="Eventopia"
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Schedule</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="time"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Lahore, Pakistan or Online"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Capacity & Pricing</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    required
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    placeholder="200"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Event Status</label>
                        <div className="relative">
                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                            >
                                <option value="">Select status</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Event Banner URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://image-link.com/event.jpg"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Description</label>
                        <textarea
                            required
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell people what this event is about..."
                            className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium resize-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        type="reset"
                        onClick={() => {
                            setEventName('');
                            setOrganizer('');
                            setDate('');
                            setTime('');
                            setLocation('');
                            setCapacity('');
                            setPrice('');
                            setStatus('');
                            setImageUrl('');
                            setDescription('');
                            dispatch(clearError());
                            dispatch(clearSuccess());
                        }}
                        className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
                    >
                        Reset Form
                    </button>

                    <button
                        type="submit"
                        disabled={loading === 'loading'}
                        className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading === 'loading' ? 'Creating Event...' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
