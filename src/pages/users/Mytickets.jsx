import React, { useEffect, useState } from 'react';
import { db, auth } from '../../config/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Ticket, Calendar, MapPin, QrCode, Search, Loader2 } from 'lucide-react';
import QRCode from "react-qr-code";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!auth.currentUser) return;

        const q = query(
          collection(db, "tickets"),
          where("userId", "==", auth.currentUser.uid),
        );

        const querySnapshot = await getDocs(q);
        const ticketData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTickets(ticketData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900">My Tickets</h1>
            <p className="text-slate-500">You have {tickets.length} active bookings</p>
          </header>

          {tickets.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="text-indigo-600" size={30} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No tickets found</h3>
              <p className="text-slate-500 mt-2 mb-6">Looks like you haven't booked any events yet.</p>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition">
                Browse Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row border-l-8 border-l-indigo-600">

      <div className="p-6 bg-slate-50 flex flex-col items-center justify-center border-r border-dashed border-slate-200">
        <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
          <QRCode size={100} value={ticket.id} />
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">ID: {ticket.id.substring(0, 8)}</span>
      </div>


      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full tracking-wider">
              {ticket.quantity} Guest(s)
            </span>
            <span className="text-slate-300"><Ticket size={18} /></span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-4">{ticket.name}</h2>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Calendar size={14} className="text-indigo-500" />
              <span>Booked on {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <MapPin size={14} className="text-indigo-500" />
              <span>Official Entry </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
          <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
            View Receipt
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
