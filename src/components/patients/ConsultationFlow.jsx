import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, CreditCard, CheckCircle, ArrowRight, Shield, 
  FileText, Image as ImageIcon, Briefcase, Lock, 
  ChevronRight, AlertCircle, Wallet
} from 'lucide-react';
import toast from 'react-hot-toast';

const ConsultationFlow = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    description: '',
    files: [],
    paymentMethod: 'card'
  });

  const handleNext = () => {
    if (step === 1 && formData.description.length < 10) {
      toast.error("Please provide a more detailed description");
      return;
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate payment
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      toast.success("Payment Received Successfully!");
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
          <FileText className="w-6 h-6 text-primary mr-2" /> Medical Details
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Describe your symptoms & medical history</label>
            <textarea 
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please describe any symptoms you're feeling, previous treatments, or specific concerns for the doctor..."
              className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary h-40 resize-none transition-all"
            />
          </div>

          <div className="pt-4">
            <label className="block text-sm font-bold text-slate-700 mb-4">Upload Medical Reports & Images (Optional)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-3xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all text-center">
                <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">Ultrasound Images</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
              </div>
              <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-3xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all text-center">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">Lab Results (PDF)</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-primary py-4 rounded-2xl text-white font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transform transition-all flex items-center justify-center group"
      >
        Proceed to Payment <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-slate-900 flex items-center">
            <CreditCard className="w-6 h-6 text-primary mr-2" /> Secure Checkout
          </h3>
          <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Lock className="w-3 h-3 mr-1" /> Encrypted
          </div>
        </div>

        <div className="space-y-6">
          {/* Payment Method Toggle */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setFormData({...formData, paymentMethod: 'card'})}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 hover:bg-white'}`}
            >
              <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'card' ? 'text-primary' : 'text-slate-400'}`} />
              <span className={`text-xs font-bold ${formData.paymentMethod === 'card' ? 'text-primary' : 'text-slate-500'}`}>Credit Card</span>
            </button>
            <button 
              onClick={() => setFormData({...formData, paymentMethod: 'wallet'})}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 hover:bg-white'}`}
            >
              <Wallet className={`w-6 h-6 ${formData.paymentMethod === 'wallet' ? 'text-primary' : 'text-slate-400'}`} />
              <span className={`text-xs font-bold ${formData.paymentMethod === 'wallet' ? 'text-primary' : 'text-slate-500'}`}>InstaPay / Wallet</span>
            </button>
          </div>

          {/* Card Form */}
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Card Number</label>
              <input type="text" placeholder="•••• •••• •••• ••••" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Expiry</label>
                <input type="text" placeholder="MM/YY" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">CVC</label>
                <input type="text" placeholder="•••" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary font-mono" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3 mt-8">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-[10px] text-primary/80 leading-relaxed font-medium">
              Thyro Carex Escrow: Your payment is held securely and only released to the doctor after the diagnosis is complete.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-slate-900 py-4 rounded-2xl text-white font-black shadow-xl shadow-slate-200 hover:shadow-slate-300 hover:-translate-y-1 transform transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>Complete & Pay <ChevronRight className="w-5 h-5 ml-2" /></>
        )}
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center space-y-8 animate-fadeIn">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle className="w-12 h-12 text-emerald-500" />
      </div>
      
      <div>
        <h3 className="text-3xl font-black text-slate-900 mb-2">Request Sent!</h3>
        <p className="text-slate-500 text-lg">Your medical data has been sent to the doctor.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-left space-y-4">
        <h4 className="font-bold text-slate-900 flex items-center">
          <AlertCircle className="w-5 h-5 text-primary mr-2" /> What happens next?
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black border border-slate-200 flex-shrink-0 mt-0.5">1</div>
            <p>Doctor reviews your information (usually within 24 hours).</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black border border-slate-200 flex-shrink-0 mt-0.5">2</div>
            <p>You'll receive a detailed diagnosis report & chat notification.</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black border border-slate-200 flex-shrink-0 mt-0.5">3</div>
            <p>Funds will be released once you confirm the consultation.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/patient/home')}
        className="w-full py-4 rounded-2xl bg-primary text-white font-black hover:shadow-lg transition-all"
      >
        Go to Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Stepper Header */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                step === s ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/10' : 
                step > s ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300 border border-slate-200'
              }`}>
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 rounded-full transition-all ${step > s ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

      </div>
      
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConsultationFlow;
