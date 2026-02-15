import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Users, ArrowRight, Shield, Calendar, Clock, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

const PatientHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const staticDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      specialization: "Endocrinology Specialist",
      rating: 4.9,
      reviews: 128,
      clients: "1.2k+",
      price: 350,
      image: "https://images.unsplash.com/photo-1559839734-2b71ce4d825a?auto=format&fit=crop&q=80&w=400",
      location: "Cairo, Egypt",
      availability: "Available Now",
    },
    {
      id: 2,
      name: "Dr. Mohamed El-Sayed",
      specialization: "Thyroid Surgery Consultant",
      rating: 4.8,
      reviews: 95,
      clients: "850+",
      price: 500,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      location: "Giza, Egypt",
      availability: "Available tomorrow",
    },
    {
      id: 3,
      name: "Dr. Laila Hassan",
      specialization: "Internal Medicine",
      rating: 4.7,
      reviews: 64,
      clients: "500+",
      price: 300,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
      location: "Alexandria, Egypt",
      availability: "Busy",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-[#00A2C2] text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
            Find Your Specialized <br/><span className="text-blue-100">Thyroid Doctor</span>
          </h1>
          <p className="text-lg text-blue-50/90 mb-8 max-w-xl animate-fadeIn opacity-90">
            Consult with the best endocrinologists and surgeons in Egypt. 
            Professional online diagnosis with full medical privacy.
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl animate-fadeIn">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
              <input 
                type="text" 
                placeholder="Search by doctor name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-900 shadow-xl shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-white border-none"
              />
            </div>
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all flex items-center justify-center">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Categories */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {['All Specialists', 'Endocrinology', 'Thyroid Surgery', 'Internal Medicine', 'Nuclear Medicine'].map((cat, i) => (
                  <button key={cat} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-slate-900">Active Chats</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">You are currently communicating with <span className="text-primary font-black">2 Doctors</span></p>
              <Link 
                to="/patient/consultations" 
                className="block w-full text-center py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
              >
                View All Chats
              </Link>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-xl">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure Diagnosis</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Your health data is encrypted and payments are protected by Thyrax Escrow.
              </p>
              <Link to="/about" className="text-primary text-sm font-bold flex items-center hover:underline">
                Security details <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Doctor Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Recommended Doctors</h2>
              <p className="text-slate-500 text-sm font-medium">{staticDoctors.length} doctors found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staticDoctors.map((doc) => (
                <Link 
                  to={`/doctor/${doc.id}`} 
                  key={doc.id}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center shadow-sm">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                      <span className="text-xs font-bold text-slate-900">{doc.rating}</span>
                    </div>
                    {doc.availability === 'Available Now' && (
                      <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                        Online Now
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{doc.name}</h3>
                        <p className="text-sm text-primary font-medium">{doc.specialization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-4 border-y border-slate-50 my-4">
                      <div className="flex items-center text-slate-500">
                        <Users className="w-4 h-4 mr-1.5" />
                        <span className="text-xs font-medium">{doc.clients} patients</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        <span className="text-xs font-medium">{doc.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting from</p>
                        <p className="text-lg font-black text-slate-900">{doc.price} <span className="text-xs font-normal text-slate-500">EGP</span></p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-primary transition-all disabled:opacity-50" disabled>
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:border-primary hover:text-primary transition-all">2</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:border-primary hover:text-primary transition-all">3</button>
                <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:text-primary transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PatientHome;
