import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { User, Mail, Phone, Lock, Building, MapPin, Target, Send, Globe } from 'lucide-react';

// Apna JSON data import karein
import locationData from '../data/locationdata.json'; 

export default function StartupRegistration() {
    const [formData, setFormData] = useState({
        // Founder Details
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        
        // Startup Details
        startupName: '',
        website: '',
        dpiit: '',
        stage: '',
        sectors: '',
        revenueStarted: 'false',
        
        // Location 
        country: '',
        state: '',
        city: '',
        
        // Pitches
        summary: '', // Elevator Pitch
        problemStatement: ''
    });

    const [captchaToken, setCaptchaToken] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const recaptchaRef = useRef(null);

    // Dynamic lists from JSON
    const countriesList = locationData?.countries || [];
    const indiaStates = locationData?.indiaData ? Object.keys(locationData.indiaData) : [];
    const availableCities = (formData.country === 'India' && formData.state && locationData?.indiaData[formData.state]) 
        ? locationData.indiaData[formData.state] 
        : [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobile') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setFormData({ ...formData, [name]: onlyNums });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCountryChange = (e) => {
        setFormData({ ...formData, country: e.target.value, state: '', city: '' });
    };

    const handleStateChange = (e) => {
        setFormData({ ...formData, state: e.target.value, city: '' });
    };

    const handleRecaptcha = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Required API Payload
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            startupName: formData.startupName,
            selectedPlan: "sigma", // Default
            country: formData.country,
            state: formData.state,
            city: formData.city,
            industry: formData.sectors,
            startupStage: formData.stage,
            dpiitNo: formData.dpiit,
            website: formData.website,
            contactNumber: formData.mobile,
            elevatorPitch: formData.summary,
            problemStatement: formData.problemStatement,
            revenueStarted: formData.revenueStarted === 'true',
            incubationId: "6ab39542497aa33526fcd95b", // Target ID added here
            currency: "INR",
            language: "English",
            recaptchaToken: captchaToken || "" // Sending token if filled (Optional)
        };

        try {
            const response = await fetch('https://incubationmasters.com/api/startups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Startup Data Submitted Successfully!");
                setFormData({
                    firstName: '', lastName: '', email: '', password: '', mobile: '',
                    startupName: '', website: '', dpiit: '', stage: '', sectors: '', revenueStarted: 'false',
                    country: '', state: '', city: '', problemStatement: '', summary: ''
                });
                if(recaptchaRef.current) recaptchaRef.current.reset();
                setCaptchaToken(null);
            } else {
                const errorData = await response.json();
                alert(`Failed to register: ${errorData.message || "Please check your inputs."}`);
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Network error. Could not submit form.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // UI HELPER CLASSES (Rise Layout + Professional Blue/Navy Colors)
    const inputStyle = "w-full px-[16px] py-[12px] rounded-[10px] border-2 border-[#CBD5E1] focus:border-[#1F486E] focus:ring-2 focus:ring-[#1F486E]/10 outline-none transition-all text-[#0D1F2D] bg-[#F8FAFC] focus:bg-white text-[0.95rem] font-medium";
    const labelStyle = "flex items-center text-[0.95rem] font-bold text-[#0D1F2D] mb-2";
    const sectionHeadingStyle = "text-[1.3rem] font-bold text-[#0D1F2D] mb-6 flex items-center border-b border-[#CBD5E1]/50 pb-3";

    return (
        <main className="min-h-screen bg-[#F8FAFC] font-['Inter',sans-serif] pb-24">
            
            {/* ================= TOP BANNER (Dark Navy Theme) ================= */}
            <div className="w-full bg-[#0D1F2D] py-24 relative overflow-hidden shadow-inner">
                <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#287BBE]/20 blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#1F486E]/40 blur-[100px]"></div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <div className="inline-block px-[16px] py-[6px] rounded-full bg-[#287BBE]/10 border border-[#287BBE]/30 text-[#287BBE] font-semibold text-sm mb-6 backdrop-blur-sm shadow-sm">
                        Join G.Incube Ecosystem
                    </div>
                    <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold text-white tracking-tight mb-6 leading-tight">
                        Startup <span className="text-[#287BBE]">Registration</span>
                    </h1>
                    <p className="text-[#CBD5E1] text-[1.1rem] font-medium max-w-2xl mx-auto leading-relaxed">
                        Turn your vision into reality! Get access to mentorship, funding, and a thriving startup ecosystem.
                    </p>
                </div>
            </div>

            {/* ================= FORM CONTAINER ================= */}
            <div className="max-w-[1000px] mx-auto px-4 md:px-6 -mt-10 relative z-20">
                <div className="bg-white shadow-[0_15px_40px_rgba(31,72,110,0.08)] rounded-[20px] p-[30px] md:p-[50px] border border-[#CBD5E1]/50 border-t-[5px] border-t-[#1F486E]">
                    <form onSubmit={handleSubmit}>
                        
                        {/* --- 1. FOUNDER DETAILS --- */}
                        <div className="mb-10">
                            <h3 className={sectionHeadingStyle}>
                                <User className="w-5 h-5 mr-2 text-[#1F486E]" /> Founder Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>First Name <span className="text-[#EF4444] ml-1">*</span></label>
                                    <input type="text" required className={inputStyle} placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Last Name <span className="text-[#EF4444] ml-1">*</span></label>
                                    <input type="text" required className={inputStyle} placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelStyle}><Mail className="w-4 h-4 mr-1.5 text-[#1F486E]" /> Email Address <span className="text-[#EF4444] ml-1">*</span></label>
                                    <input type="email" required className={inputStyle} placeholder="Founder Email" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelStyle}><Phone className="w-4 h-4 mr-1.5 text-[#1F486E]" /> Mobile Number <span className="text-[#EF4444] ml-1">*</span></label>
                                    <input type="tel" required className={inputStyle} placeholder="10-digit Mobile" name="mobile" value={formData.mobile} onChange={handleChange} maxLength="15" />
                                </div>
                                <div>
                                    <label className={labelStyle}><Lock className="w-4 h-4 mr-1.5 text-[#1F486E]" /> Password <span className="text-[#EF4444] ml-1">*</span></label>
                                    <input type="password" required className={inputStyle} placeholder="Create a strong password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* --- 2. STARTUP DETAILS --- */}
                        <div className="mb-10">
                            <h3 className={sectionHeadingStyle}>
                                <Building className="w-5 h-5 mr-2 text-[#1F486E]" /> Startup Profile
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>Startup Name <span className="text-[#EF4444] ml-1">*</span></label>
                                    <input type="text" required className={inputStyle} placeholder="Your Startup Name" name="startupName" value={formData.startupName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelStyle}><Globe className="w-4 h-4 mr-1.5 text-[#1F486E]" /> Website URL <span className="text-[#64748B] font-normal ml-1">(Optional)</span></label>
                                    <input type="url" className={inputStyle} placeholder="https://yourstartup.com" name="website" value={formData.website} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Startup Stage <span className="text-[#EF4444] ml-1">*</span></label>
                                    <select name="stage" required className={inputStyle} value={formData.stage} onChange={handleChange}>
                                        <option value="" disabled>Select Stage</option>
                                        <option value="Ideation">Ideation</option>
                                        <option value="MVP">MVP / Proof of Concept</option>
                                        <option value="Beta_Launched">Beta Launched</option>
                                        <option value="Early_Revenues">Early Revenues</option>
                                        <option value="Steady_Revenues">Steady Revenues</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>Industry / Sector <span className="text-[#EF4444] ml-1">*</span></label>
                                    <select name="sectors" required className={inputStyle} value={formData.sectors} onChange={handleChange}>
                                        <option value="" disabled>Select Industry</option>
                                        <option value="EdTech">EdTech</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="E-Commerce">E-Commerce</option>
                                        <option value="FinTech">FinTech</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>DPIIT Number <span className="text-[#64748B] font-normal ml-1">(Optional)</span></label>
                                    <input type="text" className={inputStyle} placeholder="DPIIT Registration No." name="dpiit" value={formData.dpiit} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Revenue Started? <span className="text-[#EF4444] ml-1">*</span></label>
                                    <select name="revenueStarted" required className={inputStyle} value={formData.revenueStarted} onChange={handleChange}>
                                        <option value="false">No, pre-revenue</option>
                                        <option value="true">Yes, generating revenue</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* --- 3. LOCATION --- */}
                        <div className="mb-10">
                            <h3 className={sectionHeadingStyle}>
                                <MapPin className="w-5 h-5 mr-2 text-[#1F486E]" /> Location Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelStyle}>Country <span className="text-[#EF4444] ml-1">*</span></label>
                                    <select name="country" required className={inputStyle} value={formData.country} onChange={handleCountryChange}>
                                        <option value="" disabled>Select Country</option>
                                        {countriesList.map((c, idx) => (
                                            <option key={idx} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>State <span className="text-[#EF4444] ml-1">*</span></label>
                                    {formData.country === 'India' ? (
                                        <select name="state" required className={inputStyle} value={formData.state} onChange={handleStateChange}>
                                            <option value="" disabled>Select State</option>
                                            {indiaStates.map((s, idx) => (
                                                <option key={idx} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input type="text" required name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} className={inputStyle} disabled={!formData.country} />
                                    )}
                                </div>
                                <div>
                                    <label className={labelStyle}>City <span className="text-[#EF4444] ml-1">*</span></label>
                                    {formData.country === 'India' && availableCities.length > 0 ? (
                                        <select name="city" required className={inputStyle} value={formData.city} onChange={handleChange}>
                                            <option value="" disabled>Select City</option>
                                            {availableCities.map((c, idx) => (
                                                <option key={idx} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input type="text" required name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} className={inputStyle} disabled={!formData.state} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- 4. BUSINESS PROPOSAL --- */}
                        <div className="mb-10">
                            <h3 className={sectionHeadingStyle}>
                                <Target className="w-5 h-5 mr-2 text-[#1F486E]" /> Business Proposal
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className={labelStyle}>Problem Statement <span className="text-[#EF4444] ml-1">*</span></label>
                                    <textarea rows="3" required className={`${inputStyle} resize-none`} name="problemStatement" placeholder="What problem are you solving?" value={formData.problemStatement} onChange={handleChange}></textarea>
                                </div>
                                <div>
                                    <label className={labelStyle}>Product / Service (Elevator Pitch) <span className="text-[#EF4444] ml-1">*</span></label>
                                    <textarea rows="4" required className={`${inputStyle} resize-none`} name="summary" placeholder="Describe your product/service and how it solves the problem..." value={formData.summary} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* --- 5. GOOGLE RECAPTCHA (OPTIONAL) --- */}
                        <div className="mt-8 bg-[#F8FAFC] p-6 rounded-[12px] border border-[#CBD5E1]/50 flex flex-col items-center">
                            <label className="text-[0.85rem] font-bold text-[#64748B] uppercase tracking-wider mb-4">
                                Security Verification <span className="font-normal normal-case">(Optional)</span>
                            </label>
                            
                            {/* Uses the key from your .env file */}
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={import.meta.env.VITE_RECAPTCHA_KEY || "YOUR_FALLBACK_SITE_KEY_IF_ENV_IS_MISSING"}
                                onChange={handleRecaptcha}
                            />
                        </div>

                        {/* --- 6. SUBMIT --- */}
                        <div className="mt-10 text-center">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center px-[50px] py-[18px] bg-[#1F486E] hover:bg-[#163654] text-white font-bold rounded-[50px] text-[1.1rem] shadow-[0_10px_25px_rgba(31,72,110,0.25)] transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                            >
                                {isSubmitting ? (
                                    <><span className="inline-block w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin mr-[10px] align-middle"></span> Processing...</>
                                ) : (
                                    <><Send className="w-5 h-5 mr-2" /> Submit Registration</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}