import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthWave from "./AuthWave";
import { useAuth } from "../../contexts/AuthContext";

import toast from 'react-hot-toast';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Role Selection, 1: Login Form
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentStep(1);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Use selectedRole if needed for mock logic, but login usually handles it from backend
    const result = await login(formData.username, formData.password);
    
    setLoading(false);
    
    if (result.success) {
      toast.success('Logged in successfully');
      // If result.role isn't what we expected, we can force or warn, but usually trust backend
      const targetRole = result.role || (selectedRole === 'patient' ? 'Patient' : 'Doctor');
      
      if (targetRole === 'Admin') {
        navigate('/admin');
      } else if (targetRole === 'Patient') {
        navigate('/patient/home');
      } else {
        navigate('/profile');
      }
    } else {
      setError(result.message);
      toast.error(result.message || 'Login failed. Please check your credentials.');
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-slate-900 mb-3">Welcome Back</h2>
        <p className="text-slate-500 font-medium tracking-wide">Select your account type to continue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Patient Role */}
        <button
          onClick={() => handleRoleSelect('patient')}
          className="group relative flex flex-col items-center p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm">
            <User className="w-10 h-10" />
          </div>
          
          <h3 className="relative z-10 text-xl font-black text-slate-900 mb-2">Patient</h3>
          <p className="relative z-10 text-sm text-slate-500 text-center font-medium leading-relaxed">
            Access your results, book consultations, and chat with doctors.
          </p>
          
          <div className="mt-8 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            Select Patient
            <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3" />
            </div>
          </div>
        </button>

        {/* Doctor Role */}
        <button
          onClick={() => handleRoleSelect('doctor')}
          className="group relative flex flex-col items-center p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:-rotate-6 transition-all duration-500 shadow-sm">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11h2m-1-1v2m-11 4h4" />
            </svg>
          </div>
          
          <h3 className="relative z-10 text-xl font-black text-slate-900 mb-2">Doctor</h3>
          <p className="relative z-10 text-sm text-slate-500 text-center font-medium leading-relaxed">
            Manage your patients, update availability, and respond to requests.
          </p>

          <div className="mt-8 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            Select Doctor
            <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3" />
            </div>
          </div>
        </button>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-500 font-medium">
          New to Thyro Carex? {" "}
          <button onClick={() => navigate('/register')} className="text-primary font-black hover:underline underline-offset-4 decoration-2">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <>
      {/* Logo / Header */}
      <div className="mb-10 animate-fadeIn">
        <button 
          onClick={() => setCurrentStep(0)}
          className="flex items-center gap-2 text-slate-400 hover:text-primary mb-6 transition-colors"
        >
          <Lock className="w-4 h-4 rotate-180" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Role Selection</span>
        </button>

        <div className="relative inline-block w-full">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center w-12 h-12 mr-4 shadow-xl shadow-primary/20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              {selectedRole === 'patient' ? 'Patient' : 'Doctor'} <span className="text-primary tracking-tighter">Login</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium tracking-wide ml-16">
            Enter your credentials to access your dashboard
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-100 rounded-2xl animate-shake" role="alert">
          <span className="font-black">Error:</span> {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleLogin}>
        
        {/* Username */}
        <div className="space-y-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <User className="w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Username or Email"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              className="w-full py-4.5 pr-5 font-bold text-slate-900 placeholder-slate-400 transition-all duration-300 border-2 border-slate-50 pl-14 bg-slate-50/50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-2xl focus:shadow-primary/10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <Lock className="w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full py-4.5 pr-14 font-bold text-slate-900 placeholder-slate-400 transition-all duration-300 border-2 border-slate-50 pl-14 bg-slate-50/50 rounded-2xl focus:ring-0 focus:border-primary focus:bg-white focus:shadow-2xl focus:shadow-primary/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-5 text-slate-300 transition-colors cursor-pointer hover:text-primary"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <label className="flex items-center gap-2 text-slate-500 cursor-pointer font-black uppercase tracking-widest hover:text-slate-900 transition-colors">
            <input type="checkbox" className="w-4 h-4 border-slate-200 rounded text-primary focus:ring-primary/20 transition-all" />
            <span>Remember me</span>
          </label>
          <a href="#" className="font-black text-slate-300 uppercase tracking-widest hover:text-primary transition-colors">
            Forgot?
          </a>
        </div>

        <div className="flex pt-6">
          <button 
            disabled={loading}
            className="flex-1 py-5 px-8 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? 'Authenticating...' : 'Sign In Now'}
          </button>
        </div>
      </form>
    </>
  );

  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-white selection:bg-primary selection:text-white">
      
      {/* ========== LEFT CONTENT (Form) ========== */}
      <div className="z-20 flex flex-col justify-center w-full lg:w-[55%] h-full px-4 sm:px-12 lg:px-24">
        <div className="w-full max-w-lg mx-auto py-12">
          {currentStep === 0 ? renderRoleSelection() : renderLoginForm()}
        </div>
      </div>

      {/* ========== ANIMATED WAVE SECTION WITH LOTTIE ========== */}
      <AuthWave />

      <style>{`
        :root {
          --primary: #4695a5;
        }
        
        /* Focus styles for inputs */
        input:focus {
          outline: none;
          border-color: #4695a5 !important;
          box-shadow: 0 0 0 3px rgba(70, 149, 165, 0.1);
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default Login;