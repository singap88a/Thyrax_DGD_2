import React, { useState } from 'react';
import { 
  Shield, TrendingUp, Wallet, ArrowUpRight, 
  Clock, CheckCircle, XCircle, MoreVertical,
  Filter, Search, Download, DollarSign, Users,
  BarChart3, User
} from 'lucide-react';

const EscrowManager = () => {
  const [filter, setFilter] = useState('all');

  const stats = [
    { label: "Total Volume", value: "45,280 EGP", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Net Commision (15%)", value: "6,792 EGP", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "In Escrow", value: "12,450 EGP", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active Consultations", value: "34", icon: Users, color: "text-primary", bg: "bg-primary/5" }
  ];

  const transactions = [
    {
      id: "TRX-9942",
      doctor: "Dr. Sarah Ahmed",
      patient: "Ahmed Mansour",
      amount: 350,
      commision: 52.5,
      net: 297.5,
      date: "Feb 15, 2024",
      status: "In Escrow",
    },
    {
      id: "TRX-9938",
      doctor: "Dr. Mohamed El-Sayed",
      patient: "Laila Ibrahim",
      amount: 500,
      commision: 75,
      net: 425,
      date: "Feb 14, 2024",
      status: "Completed",
    },
    {
      id: "TRX-9930",
      doctor: "Dr. Sarah Ahmed",
      patient: "Samy Khalil",
      amount: 350,
      commision: 52.5,
      net: 297.5,
      date: "Feb 12, 2024",
      status: "Refunded",
    }
  ];

  return (
    <div className="p-8 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Escrow Financial Manager</h1>
          <p className="text-slate-500 font-medium">Monitor consultation payments, platform fees, and payouts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            <DollarSign className="w-4 h-4" /> Settlement Round
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-primary" /> Recent Transactions
          </h3>
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            {['all', 'in escrow', 'completed', 'refunded'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultation</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform (15%)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Doctor Payout</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions
                .filter(t => filter === 'all' || t.status.toLowerCase() === filter)
                .map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{trx.doctor}</p>
                        <p className="text-xs text-slate-400 font-medium">to {trx.patient}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900">{trx.amount} EGP</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{trx.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 text-primary">
                      <ArrowUpRight className="w-3 h-3" />
                      <span className="text-sm font-black">{trx.commision} EGP</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">{trx.net} EGP</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      trx.status === 'In Escrow' ? 'bg-amber-100 text-amber-700' :
                      trx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; translateY(20px); }
          to { opacity: 1; translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EscrowManager;
