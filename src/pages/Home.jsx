import React from 'react'
import Navbar from '../components/Navbar'
import HeroCarousel from '../components/HeroCarousel'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';

import {
  fetchEvents,
  selectEvents,
  selectEventsLoading,
  selectEventsError,
} from '../redux/reducers/EventSlice';
import Footer from '../components/Footer'

const Home = () => {

  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">

        <HeroCarousel />


        <main className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <button className="text-indigo-600 font-semibold hover:underline">View All</button>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-600 text-sm font-medium">{error.message}</p>
              </div>
            )}

            {loading === 'loading' && (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 mt-4 font-medium">Loading events...</p>
              </div>
            )}
            {
              loading === 'succeeded' && events.map((event) => {
                return <div key={event.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                        {event.status}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                        {event.price === 0 ? "Free" : `$${event.price}`}
                      </span>
                    </div>
                  </div>


                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {event.name}
                    </h3>

                    <div className="space-y-2 mb-6">

                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>


                    <Link
                      to={`/${event.id}`}
                      className="mt-auto w-full inline-flex items-center justify-center bg-gray-50 text-indigo-600 font-bold py-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              })
            }


          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Home
