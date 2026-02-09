
import { Calendar, MapPin, Users, Ticket, ArrowLeft, Clock, ShieldCheck, Share2 } from 'lucide-react';
import Navbar from '../../components/Navbar'

const EventDetail = () => {
    const placeholderEvent = {
        title: "Global Tech Innovators Summit 2024",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1540575861501-7ad0582373f3?q=80&w=1200",
        date: "Saturday, Oct 24, 2024",
        timeStart: "10:00 AM",
        timeEnd: "04:00 PM",
        location: "Silicon Valley Convention Center, CA",
        price: 49,
        organizer: "TechCorp Events",
        description: "Join us for the most anticipated technology event of the year. Featuring keynote speakers from top global firms, hands-on workshops, and networking opportunities that will define the next decade of innovation."
    };
    return (
        <>
            <Navbar />






            <div className="min-h-screen bg-slate-50 pb-12">
                {/* Top Navigation Bar (Simplified for Detail Page) */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <button className="flex items-center text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Explore
                        </button>
                        <div className="flex gap-4">
                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Hero Image */}
                            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
                                <img
                                    src={placeholderEvent.image}
                                    alt="Event Banner"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm uppercase">
                                        {placeholderEvent.category}
                                    </span>
                                </div>
                            </div>

                            {/* Event Title & Essential Info */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                                    {placeholderEvent.title}
                                </h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                                            <p className="font-bold text-gray-900">{placeholderEvent.date}</p>
                                            <p className="text-sm text-gray-600">{placeholderEvent.timeStart} - {placeholderEvent.timeEnd}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Location</p>
                                            <p className="font-bold text-gray-900 line-clamp-1">{placeholderEvent.location}</p>
                                            <p className="text-sm text-indigo-600 font-semibold cursor-pointer hover:underline">View on Map</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Event</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {placeholderEvent.description}
                                </p>
                                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                                        {placeholderEvent.organizer[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Organized by</p>
                                        <p className="font-bold text-gray-900">{placeholderEvent.organizer}</p>
                                    </div>
                                    <button className="ml-auto text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sticky Booking Widget */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-50">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-500 font-medium">Ticket Price</span>
                                        <span className="text-4xl font-black text-indigo-600">
                                            ${placeholderEvent.price}
                                        </span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center text-sm font-bold text-gray-700">
                                                <Users className="w-4 h-4 mr-2 text-indigo-500" /> Availability
                                            </div>
                                            <span className="text-sm font-bold text-emerald-600">High Demand</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center text-sm font-bold text-gray-700">
                                                <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" /> Secure Booking
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">Verified</span>
                                        </div>
                                    </div>

                                    {/* Requirement: Book Ticket Button */}
                                    <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                                        <Ticket className="w-5 h-5" />
                                        Get Your Ticket
                                    </button>

                                    <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">
                                        Instant QR Code Delivery
                                    </p>
                                </div>

                                {/* Ticket Counter Bonus Preview */}
                                <div className="bg-indigo-900 rounded-3xl p-6 text-white overflow-hidden relative">
                                    <div className="relative z-10">
                                        <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Tickets Sold</p>
                                        <p className="text-3xl font-black">124 / 200</p>
                                        <div className="mt-4 w-full bg-indigo-800 rounded-full h-2">
                                            <div className="bg-indigo-400 h-2 rounded-full w-[62%]"></div>
                                        </div>
                                    </div>
                                    <Ticket className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
            );


        </>
    )
}

export default EventDetail
