import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: "Ai Indus Week 2026",
        description: "Join the brightest minds in technology for a day of inspiration and networking.",
        image: "https://xnovzibnypchvlpxqziy.supabase.co/storage/v1/object/public/user-avatars/blogs/covers/indus-ai-week-2026--complete-guide---registration---events-1769504943962/1769513051085-Untitled_design_20.png",
        buttonText: "Book Now",
        link: "/event/1"
    },
    {
        id: 2,
        title: "Global Music Festival",
        description: "Experience live performances from world-class artists under the stars.",
        image: "https://images.unsplash.com/photo-1582711012124-a56cf82307a0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
        buttonText: "Get Tickets",
        link: "/event/2"
    },
    {
        id: 3,
        title: "Art & Culture Expo",
        description: "Discover stunning masterpieces and cultural exhibits from around the globe.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
        buttonText: "Explore More",
        link: "/event/3"
    }
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [currentIndex]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative h-[500px] w-full group overflow-hidden bg-gray-900">
            {/* Slides Container */}
            <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 animate-fade-in-up">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-8">
                                {slide.description}
                            </p>
                            <Link
                                to={slide.link}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                            >
                                {slide.buttonText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white hover:bg-black/50 transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                onClick={nextSlide}
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white hover:bg-black/50 transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 transition-all duration-300 rounded-full ${currentIndex === index ? 'w-8 bg-indigo-500' : 'w-2 bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;