import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageSquare, User, Clock, CheckCircle, 
  Search, FileText, ChevronRight, CreditCard, Shield, Star, Calendar
} from 'lucide-react';

const MyConsultations = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const staticConsultations = [
    {
      id: "REQ-001",
      doctorId: 1,
      doctorName: "Dr. Sarah Ahmed",
      specialization: "Endocrinology Specialist",
      date: "Feb 15, 2024",
      status: "In Progress",
      type: "Online Diagnosis",
      price: 350,
      image: "https://images.unsplash.com/photo-1559839734-2b71ce4d825a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "REQ-002",
      doctorId: 2,
      doctorName: "Dr. Mohamed El-Sayed",
      specialization: "Thyroid Surgery Consultant",
      date: "Feb 10, 2024",
      status: "Completed",
      type: "Online Diagnosis",
      price: 500,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/patient/home')}
                className="p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-slate-900 leading-tight">My Consultations</h1>
                <p className="text-slate-500 text-sm font-medium">Track your medical conversations and diagnoses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Stats & Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Active Chats</span>
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-xs">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Completed</span>
                  <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black text-xs">1</span>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4">
                   <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Total Invested</p>
                   <p className="text-2xl font-black text-slate-900">850 EGP</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-900/20">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-black text-lg mb-2">Escrow Protection</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your payments are only released to doctors after you confirm the receipt of your diagnosis.
              </p>
            </div>
          </div>

          {/* Consultations List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex gap-2 w-fit mb-4">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {staticConsultations
                .filter(c => filter === 'all' || (filter === 'active' && c.status === 'In Progress') || (filter === 'completed' && c.status === 'Completed'))
                .map((consult) => (
                <div 
                  key={consult.id}
                  className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img src={consult.image} alt={consult.doctorName} className="w-full h-full object-cover rounded-3xl" />
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                        consult.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}>
                        {consult.status === 'Completed' ? <CheckCircle className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-white" />}
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{consult.doctorName}</h3>
                        <span className="hidden md:block text-slate-300">•</span>
                        <p className="text-primary text-sm font-bold">{consult.specialization}</p>
                      </div>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {consult.date}</span>
                        <span className="flex items-center gap-1.5 font-black uppercase tracking-widest text-[10px] bg-slate-100 px-2 py-0.5 rounded">{consult.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="hidden lg:block text-right pr-4 border-r border-slate-100">
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Price</p>
                         <p className="text-lg font-black text-slate-900">{consult.price} EGP</p>
                      </div>
                      <Link 
                        to={`/doctor/consultations/${consult.id}`}
                        className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                      >
                        <MessageSquare className="w-4 h-4" /> Open Chat
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyConsultations;
