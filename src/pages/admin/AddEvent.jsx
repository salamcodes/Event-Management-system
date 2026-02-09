import React from 'react';
import Sidebar from '../../components/Sidebar';
import EventForm from '../../components/EventForm';

const AddEvent = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar: Fixed height and width */}
            <Sidebar />

            {/* Main Content Area: Scrollable independently */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto lg:pl-0">
                {/* Note: Since your Sidebar is 'fixed' on mobile and 'sticky' on desktop, 
                   we use a wrapper that allows this area to scroll.
                */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
                    <div className="px-8 py-6">
                        <h1 className="text-3xl font-black text-slate-900">Manage Events</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Create and configure new experiences for your attendees
                        </p>
                    </div>
                </header>

                <main className="p-4 md:p-8 flex-1">
                    <div className="max-w-4xl mx-auto pb-20"> {/* pb-20 ensures space at the bottom */}
                        <EventForm />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddEvent;