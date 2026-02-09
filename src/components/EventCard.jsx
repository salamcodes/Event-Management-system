import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';


const EventCard = () => {

    const event = {
        id: "1",
        title: "Global Tech Summit 2024",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
        date: "Oct 24, 2024 • 10:00 AM",
        location: "Silicon Valley Center, CA",
        category: "Technology",
        price: 49,
        description: "Join the world's leading tech innovators for a day of networking and groundbreaking announcements."
    }

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            {/* Image Container */}


            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                        {event.category}
                    </span>
                </div>
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4">
                    <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                        {event.price === 0 ? "Free" : `$${event.price}`}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {event.title}
                </h3>

                <div className="space-y-2 mb-6">
                    {/* Date */}
                    <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>{event.date}</span>
                    </div>
                    {/* Location */}
                    <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    to={`/{event.id}`}
                    className="mt-auto w-full inline-flex items-center justify-center bg-gray-50 text-indigo-600 font-bold py-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>



        </div>
    );
};

export default EventCard;