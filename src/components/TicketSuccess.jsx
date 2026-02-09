import React, { useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import { Download, CheckCircle, Home } from 'lucide-react';

const TicketSuccess = () => {
    const { id } = useParams();
    const ticketRef = useRef(null);
    const location = useLocation()

    const quantity = location.state?.quantity || 1;

    const downloadTicket = () => {
        if (ticketRef.current === null) return;

        toPng(ticketRef.current, { cacheBust: true })
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
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={60} />
                <h1 className="text-2xl font-black text-slate-900">Booking Successful!</h1>
                <p className="text-slate-500 mb-8">Your ticket is ready for your event.</p>


                <div ref={ticketRef} className="bg-white p-6 border-2 border-dashed border-slate-200 rounded-2xl mb-8">
                    <div className="bg-indigo-600 text-white py-2 rounded-lg mb-6 font-bold text-xs uppercase tracking-widest">
                        Official Ticket
                    </div>


                    <div className="flex justify-center mb-6">
                        <QRCode size={180} value={`TICKET_${id}`} />
                    </div>


                    <div className="flex justify-between items-center px-2 mb-4">
                        <div className="text-left">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Guests</p>
                            <p className="text-lg font-black text-indigo-600">{quantity} Person(s)</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Type</p>
                            <p className="text-lg font-black text-slate-800">General</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <p className="text-sm font-bold text-slate-800">Scan at Entry</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">ID: {id.substring(0, 8)}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={downloadTicket}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                    >
                        <Download size={20} /> Download Ticket
                    </button>
                    <Link to="/" className="text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:text-slate-800">
                        <Home size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketSuccess;