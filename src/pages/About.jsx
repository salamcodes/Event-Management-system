import { Target, Users, Zap, ShieldCheck, Globe, Rocket, Heart } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';



const About = () => {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />


            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        Our Mission
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-6 mb-8 tracking-tight">
                        We bring people <span className="text-indigo-600">together.</span>
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
                        Eventopia is the world's most intuitive platform for event management.
                        We believe that life is defined by experiences, and we're here to make
                        sure those experiences are seamless, accessible, and unforgettable.
                    </p>
                </div>
            </section>


            <section className="bg-slate-900 py-16 px-6 rounded-[3rem] mx-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Active Users", value: "1000+" },
                        { label: "Events Hosted", value: "5+" },
                        { label: "Tickets Sold", value: "200k+" },
                        { label: "Countries", value: "5+" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{stat.value}</h2>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">The Eventopia Way</h2>
                    <p className="text-slate-500 max-w-xl">Our core values guide every line of code we write and every event we power.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Value 1 */}
                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 transition-all group">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4">Speed & Ease</h3>
                        <p className="text-slate-500 leading-relaxed">Book a ticket in 30 seconds or launch an international summit in 5 minutes. We remove the friction.</p>
                    </div>

                    {/* Value 2 */}
                    <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white md:translate-y-[-20px] shadow-2xl shadow-indigo-200">
                        <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-4">Bulletproof Trust</h3>
                        <p className="text-indigo-100 leading-relaxed">Every QR code is unique and every transaction is secured. We protect your events like they are our own.</p>
                    </div>

                    {/* Value 3 */}
                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 transition-all group">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            <Globe className="text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4">Global Access</h3>
                        <p className="text-slate-500 leading-relaxed">Whether it’s a local meetup in Lahore or a tech fest in New York, we connect communities globally.</p>
                    </div>
                </div>
            </section>


            <section className="py-24 px-6 bg-slate-50/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                                alt="Team"
                                className="rounded-[3rem] shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-2xl">
                                        <Heart className="text-green-600" fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">User Obsessed</p>
                                        <p className="text-xs text-slate-500">24/7 Support Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl font-black text-slate-900 leading-tight">Built by creators, for <span className="text-indigo-600 underline decoration-indigo-200">creators.</span></h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Eventopia started in a small room with a big idea: that managing an event shouldn't be a nightmare of spreadsheets and broken links.
                        </p>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Today, we are a global team of developers, designers, and event lovers working to ensure that your only worry is making sure you have enough seats for your guests.
                        </p>
                        <div className="pt-4">
                            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200">
                                Join our Team
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto bg-indigo-50 p-16 rounded-[4rem]">
                    <Rocket className="text-indigo-600 mx-auto mb-6" size={48} />
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Ready to make history?</h2>
                    <p className="text-slate-600 mb-10 text-lg">Your next legendary event starts with a single click.</p>
                    <button className="bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all">
                        Create Your Event Now
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;