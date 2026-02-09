import React, { useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added this
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import { Download, CheckCircle, Home } from 'lucide-react';

const TicketSuccess = () => {
    const { id } = useParams(); // This is the eventId
    const ticketRef = useRef(null);
    const location = useLocation();

    // Get the current user to reconstruct the Ticket ID
    const user = useSelector(state => state.auth.user);
    const quantity = location.state?.quantity || 1;

    // IMPORTANT: This must match the ID generated in your Redux Slice
    const ticketId = `${id}_${user?.uid}`;

    const downloadTicket = () => {
        if (ticketRef.current === null) return;

        toPng(ticketRef.current, {
            cacheBust: true,
            backgroundColor: '#ffffff', // Ensures the PNG has a white background
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `ticket-${id}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => console.error('Image generation failed', err));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl max-w-sm w-full text-center border border-slate-100">
                <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-emerald-500" size={40} />
                </div>
                <h1 className="text-2xl font-black text-slate-900">Booking Confirmed!</h1>
                <p className="text-slate-500 mb-8 text-sm">Show this QR code at the entrance.</p>

                {/* THE TICKET ELEMENT (This is what gets downloaded) */}
                <div ref={ticketRef} className="bg-white p-6 border-2 border-dashed border-slate-200 rounded-[2rem] mb-8">
                    <div className="bg-indigo-600 text-white py-2 rounded-xl mb-6 font-black text-[10px] uppercase tracking-[0.2em]">
                        Official Event Pass
                    </div>

                    {/* QR CODE - Using the corrected actualTicketId */}
                    <div className="flex justify-center mb-6 p-2 bg-white">
                        <QRCode
                            size={180}
                            value={ticketId}
                            level="H"
                        />
                    </div>

                    <div className="flex justify-between items-center px-2 mb-4">
                        <div className="text-left">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Guests</p>
                            <p className="text-lg font-black text-indigo-600">{quantity} Person(s)</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Holder</p>
                            <p className="text-sm font-bold text-slate-800 truncate w-24">
                                {user?.displayName?.split(' ')[0] || "Guest"}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gate Security ID</p>
                        <p className="text-[10px] text-slate-900 font-mono mt-1 break-all bg-slate-50 p-1 rounded">
                            {ticketId}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={downloadTicket}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                        <Download size={20} /> Download Ticket
                    </button>
                    <Link to="/" className="text-slate-400 font-bold text-xs flex items-center justify-center gap-2 hover:text-indigo-600 transition-colors py-2">
                        <Home size={14} /> Return to Dashboard
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Eventopia Ticketing System</p>
        </div>
    );
};

export default TicketSuccess;