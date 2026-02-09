import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, clearTicketsSuccess, selectTicketsLoading, selectTicketsSuccess } from "../../redux/reducers/ticketSlice";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const BookTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector(selectTicketsLoading) === "loading";
    const isSuccess = useSelector(selectTicketsSuccess);

    const [formData, setFormData] = useState({
        name: "",
        email: "".toLocaleLowerCase(),
        phone: "",
        quantity: 1
    });


    useEffect(() => {
        if (isSuccess) {
            navigate(`/ticket-success/${id}`, { state: { quantity: formData.quantity } });
            dispatch(clearTicketsSuccess());
        }
    }, [isSuccess, navigate, id, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTicket({
            eventId: id,
            name: formData.name,
            email: formData.email.toLowerCase(),
            phone: formData.phone,
            quantity: Number(formData.quantity)
        }));
    };

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto mt-12 bg-white p-10 rounded-3xl shadow-lg border border-slate-100">

                <h1 className="text-3xl font-black mb-2 text-slate-900">Book Ticket</h1>
                <p className="text-slate-500 mb-8">Enter your details below.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone (Optional)</label>
                        <input
                            type="text"
                            placeholder="+92 333 3333333"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Number of Attendees</label>
                        <input
                            type="number"
                            min="1"
                            max="2"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            required
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all cursor-pointer"
                    >
                        {loading ? "Processing..." : "Confirm Booking"}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default BookTicket;