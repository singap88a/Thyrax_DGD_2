import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageSquare, User, Clock, CheckCircle, 
  XCircle, Filter, Search, FileText, ChevronRight,
  CreditCard, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const ConsultationRequests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const staticRequests = [
    {
      id: "REQ-001",
      patientName: "Ahmed Mansour",
      date: "2024-02-15 10:30 AM",
      status: "Pending",
      symptoms: "Swelling in neck area, difficulty swallowing for 2 weeks.",
      price: 350,
      hasImages: true
    },
    {
      id: "REQ-002",
      patientName: "Laila Ibrahim",
      date: "2024-02-14 02:15 PM",
      status: "In Progress",
      symptoms: "Feeling extremely tired, dry skin, and hair loss. Suspected hypothyroidism.",
      price: 350,
      hasImages: true
    },
    {
      id: "REQ-003",
      patientName: "Samy Khalil",
      date: "2024-02-12 05:00 PM",
      status: "Completed",
      symptoms: "Follow up after thyroidectomy surgery.",
      price: 350,
      hasImages: false
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
                onClick={() => navigate('/profile')}
                className="p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-slate-900 leading-tight">Consultation Requests</h1>
                <p className="text-slate-500 text-sm font-medium">Manage your online patient inquiries</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-black">Escrow Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Filters & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
              {['all', 'pending', 'in progress', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                    filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Pending Payout</p>
                <p className="text-lg font-black text-slate-900">700 EGP</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {staticRequests
            .filter(req => filter === 'all' || req.status.toLowerCase() === filter)
            .map((req) => (
            <div 
              key={req.id}
              className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/5 transition-colors">
                  <User className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-slate-900">{req.patientName}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      req.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-500 font-medium mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {req.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> {req.hasImages ? 'Attachements included' : 'No attachments'}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 italic">
                    "{req.symptoms}"
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <div className="text-right px-4 mb-2">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Consultation Fee</p>
                        <p className="text-lg font-black text-slate-900">{req.price} EGP</p>
                    </div>
                    
                    <Link 
                      to={`/doctor/consultations/${req.id}`}
                      className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm text-center hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Open Chat
                    </Link>
                    
                    {req.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">Reject</button>
                        <button className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all">Accept</button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
          
          {staticRequests.filter(req => filter === 'all' || req.status.toLowerCase() === filter).length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No requests found</h3>
              <p className="text-slate-500">There are no inquiries matching your current filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationRequests;
