import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Users, Shield, Clock, MapPin, CheckCircle, 
  ArrowLeft, MessageSquare, Award, PlayCircle, Heart,
  Info, Calendar, CreditCard, ChevronRight
} from 'lucide-react';

const DoctorProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Static data based on ID
  const doctor = {
    id: id,
    name: id === "1" ? "Dr. Sarah Ahmed" : id === "2" ? "Dr. Mohamed El-Sayed" : "Dr. Laila Hassan",
    specialization: id === "1" ? "Endocrinology Specialist" : id === "2" ? "Thyroid Surgery Consultant" : "Internal Medicine",
    rating: 4.9,
    reviewsCount: 128,
    patientsCount: "1.2k+",
    price: id === "1" ? 350 : id === "2" ? 500 : 300,
    image: id === "1" 
      ? "https://images.unsplash.com/photo-1559839734-2b71ce4d825a?auto=format&fit=crop&q=80&w=400"
      : id === "2"
      ? "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
      : "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Sarah is a highly qualified endocrinologist with over 12 years of experience in managing complex thyroid cases. She specialized in hormone therapy and early detection of thyroid nodules. Known for her patient-centric approach and detailed diagnostic reports.",
    education: [
      "PhD in Endocrinology, Cairo University",
      "MBBS, Alexandria Faculty of Medicine",
      "Member of the Royal College of Physicians (MRCP, UK)"
    ],
    expertise: ["Autoimmune Thyroiditis", "Thyroid Nodules", "Hormonal Imbalance", "Diabetes Mellitus"],
    reviews: [
      { id: 1, user: "Ahmed M.", rating: 5, comment: "Excellent doctor, very patient and explains everything clearly. The online report was very detailed.", date: "2 days ago" },
      { id: 2, user: "Heba L.", rating: 5, comment: "I've been following up with Dr. Sarah for 6 months. She's the best! Highly recommended.", date: "1 week ago" }
    ]
  };

  const handleStartConsultation = () => {
    navigate(`/consultation/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h2 className="text-lg font-bold text-slate-900">Doctor Profile</h2>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Details */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/10">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-2 rounded-xl shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">{doctor.name}</h1>
                    <p className="text-primary font-bold text-lg">{doctor.specialization}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1.5" />
                    <span className="text-sm font-black text-slate-900">{doctor.rating}</span>
                    <span className="text-xs text-slate-400 ml-1">({doctor.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Users className="w-4 h-4 text-primary mr-1.5" />
                    <span className="text-sm font-black text-slate-900">{doctor.patientsCount}</span>
                    <span className="text-xs text-slate-400 ml-1">Patients</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {doctor.expertise.map(exp => (
                    <span key={exp} className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/10">{exp}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* About & Education */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <section>
                <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 text-primary mr-2" /> About Doctor
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg italic">
                  "{doctor.bio}"
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 text-primary mr-2" /> Education
                  </h3>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, i) => (
                      <li key={i} className="flex items-start text-slate-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                    <PlayCircle className="w-6 h-6 text-primary mr-2" /> Video Consultation
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-2 font-bold uppercase">Average Duration</p>
                    <div className="flex items-center text-slate-900 font-black">
                      <Clock className="w-5 h-5 mr-2 text-primary" /> 20-30 Minutes
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 flex items-center">
                  <MessageSquare className="w-6 h-6 text-primary mr-2" /> Patient Reviews
                </h3>
                <button className="text-primary font-bold text-sm hover:underline">View All</button>
              </div>
              
              <div className="space-y-6">
                {doctor.reviews.map(review => (
                  <div key={review.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-black text-slate-900">{review.user}</h4>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                    </div>
                    <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-slate-100">
                <div className="text-center mb-6">
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Consultation Fee</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-black text-slate-900">{doctor.price}</span>
                    <span className="text-slate-500 ml-1 font-bold">EGP</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center mr-3 flex-shrink-0 shadow-lg shadow-emerald-200">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-emerald-900">Protected Payment</h4>
                      <p className="text-[10px] text-emerald-700">Money safe in escrow</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" /> Digital Diagnosis Report
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" /> Online Chat Follow-up
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" /> Prescription & Labs Request
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleStartConsultation}
                  className="w-full bg-primary py-4 rounded-2xl text-white font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transform transition-all flex items-center justify-center group"
                >
                  Start Consultation <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-[10px] text-slate-400 text-center mt-4 px-4 leading-relaxed">
                  By starting, you agree to the medical terms of online consultation.
                </p>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-[2.5rem] text-white">
                <h4 className="font-bold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-primary mr-2" /> Next Available
                </h4>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Tommorrow</p>
                      <p className="font-bold">10:00 AM - 12:00 PM</p>
                    </div>
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileView;
