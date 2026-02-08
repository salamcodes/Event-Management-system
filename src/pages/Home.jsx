import React from 'react'
import Navbar from '../components/Navbar'
import HeroCarousel from '../components/HeroCarousel'
import EventCard from '../components/EventCard'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <button className="text-indigo-600 font-semibold hover:underline">View All</button>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard />
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
