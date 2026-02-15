import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Send, Paperclip, User, Shield, 
  MoreVertical, FileText, Image as ImageIcon, 
  CheckCheck, Info, Clock, CheckCircle, Star, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ConsultationChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isDoctor = user?.role === 'Doctor';
  
  const [message, setMessage] = useState('');
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      text: "Hello Doctor, I've uploaded my latest blood test results. I've been feeling more fatigued than usual lately despite keeping my dosage the same.",
      time: "10:30 AM",
      type: 'text'
    },
    {
      id: 2,
      sender: 'patient',
      text: "blood_test_results.pdf",
      time: "10:31 AM",
      type: 'file'
    },
    {
      id: 3,
      sender: 'doctor',
      text: "Hello! I've received your results. I'm reviewing them now. Fatigue can sometimes be related to TSH fluctuations. Let's look at your levels.",
      time: "11:00 AM",
      type: 'text'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMsg = {
      id: chatMessages.length + 1,
      sender: isDoctor ? 'doctor' : 'patient',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden border border-primary/20">
              {isDoctor ? (
                <User className="w-6 h-6 text-primary" />
              ) : (
                <img src="https://images.unsplash.com/photo-1559839734-2b71ce4d825a?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Doctor" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                {isDoctor ? 'Ahmed Mansour' : 'Dr. Sarah Ahmed'}
              </h2>
              <div className="flex items-center gap-1.5 ">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {isDoctor ? 'Active Consultation' : 'General Practitioner'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-100">
             <Shield className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase">Escrow Secured</span>
           </div>
           <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
             <MoreVertical className="w-5 h-5 text-slate-400" />
           </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <div className="flex justify-center mb-8">
            <div className="bg-white/50 backdrop-blur-sm border border-slate-200 px-4 py-1.5 rounded-full flex items-center gap-2">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Consultation started on Feb 15, 2024</span>
            </div>
        </div>

        {chatMessages.map((msg) => {
          const isOwn = msg.sender === (isDoctor ? 'doctor' : 'patient');
          return (
            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] md:max-w-[60%] ${isOwn ? 'bg-primary text-white border-primary' : 'bg-white text-slate-900 border-slate-100'} rounded-[1.5rem] p-4 shadow-sm border`}>
                {msg.type === 'file' ? (
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${isOwn ? 'bg-white/10' : 'bg-slate-50'}`}>
                    <FileText className={`w-8 h-8 ${isOwn ? 'text-white' : 'text-primary'}`} />
                    <div className="flex-1 truncate">
                      <p className={`text-sm font-bold truncate ${isOwn ? 'text-white' : 'text-slate-900'}`}>{msg.text}</p>
                      <p className={`text-[10px] ${isOwn ? 'text-white/60' : 'text-slate-400'}`}>2.4 MB • PDF</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                )}
                <div className={`flex items-center justify-end gap-1 mt-2 ${isOwn ? 'text-white/60' : 'text-slate-400'}`}>
                  <span className="text-[9px] font-bold">{msg.time}</span>
                  {isOwn && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-200 shadow-2xl">
        <form onSubmit={handleSendMessage} className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button type="button" className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
              <Paperclip className="w-5 h-5" />
            </button>
            <button type="button" className="p-3 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your medical response..." 
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
            />
          </div>

          <button 
            type="submit"
            className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transform transition-all flex items-center justify-center font-black"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <div className="max-w-7xl mx-auto mt-4 px-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
                <div className="flex items-center gap-1">
                   <Shield className="w-3 h-3 text-primary" />
                   <span className="text-[8px] font-black uppercase text-primary tracking-widest">Escrow Active</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Maintain professional conduct</span>
            </div>
            
            {isDoctor ? (
              <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Complete & Release Funds</span>
              </button>
            ) : (
               <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest italic">Funds held safely by Thyrax</span>
               </div>
            )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ConsultationChat;
