import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import locationData from "../data/locationData.json"; // Importing your JSON data

// Updated Styling Variables (Navy Blue Professional Theme)
const C = {
  primaryText: "#0D1F2D", 
  gradientStart: "#1F486E", // Deep Navy 
  gradientEnd: "#287BBE", // Lighter blue
  buttonBg: "#1F486E", // Professional Navy Blue Button
  border: "#CBD5E1",
  textLight: "#64748B",
  red: "#EF4444",
  blueText: "#287BBE",
  bg: "#F8FAFC", // Professional light background
  white: "#FFFFFF",
};

const InvestorRegistration = () => {
  const [formData, setFormData] = useState({
    investorName: "",
    companyName: "",
    investorType: "",
    email: "",
    mobile: "",
    linkedin: "",
    country: "",
    state: "",
    city: "",
    investmentLimit: "",
    startupStages: [],
    companiesFunded: "",
    securityCode: "",
    isCertified: false,
  });

  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate a random 5-character security code on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
  };

  // Standard input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "isCertified") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handler for Checkbox Group (Startup Stages)
  const handleStageChange = (e) => {
    const { value, checked } = e.target;
    let updatedStages = [...formData.startupStages];
    
    if (checked) {
      updatedStages.push(value);
    } else {
      updatedStages = updatedStages.filter((stage) => stage !== value);
    }
    
    setFormData({ ...formData, startupStages: updatedStages });
  };

  // Handler for Country selection
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      state: "", 
      city: "",  
    });
  };

  // Handler for State selection (Only triggers for India)
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      city: "", 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.securityCode !== captcha) {
      alert("Security code does not match. Please try again.");
      generateCaptcha();
      setFormData({ ...formData, securityCode: "" });
      return;
    }

    setLoading(true);

    try {
      // --- API INTEGRATION: Replace this URL with your backend ---
      const response = await fetch("YOUR_BACKEND_API_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Investor Data Submitted Successfully!");
        setFormData({
          investorName: "", companyName: "", investorType: "", email: "", mobile: "", 
          linkedin: "", country: "", state: "", city: "", investmentLimit: "", 
          startupStages: [], companiesFunded: "", securityCode: "", isCertified: false
        });
        generateCaptcha();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to submit. Check your backend API connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, fontFamily: "sans-serif", padding: "40px" }}>
      
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: C.textLight, marginBottom: "60px", fontWeight: 500 }}>
        <span>🏠 Home</span> » <span style={{ color: C.buttonBg, fontWeight: 600 }}>Investor Registration</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto", gap: "60px" }}>
        
        {/* Left Column */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 10px 0", color: C.primaryText }}>
            Want to join G.Incube as an<br />Investor ?
          </h2>
          <h1 style={{ 
            fontSize: "64px", 
            fontWeight: 900, 
            margin: "0 0 40px 0",
            background: `linear-gradient(90deg, ${C.gradientStart}, ${C.gradientEnd})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1
          }}>
            Let’s fill<br />the form!
          </h1>
          <a href="mailto:connect@gincube.org" style={{ fontSize: "18px", color: C.buttonBg, textDecoration: "none", fontWeight: 600, borderBottom: `2px solid ${C.buttonBg}` }}>
            connect@gincube.org
          </a>
        </div>

        {/* Right Column (Form) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ flex: "2 1 600px", maxWidth: "700px", background: C.white, padding: "40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(21, 67, 107, 0.05)" }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            <InputField label="Investor Name" name="investorName" required placeholder="Enter Name" value={formData.investorName} onChange={handleChange} />
            <InputField label="Company Name" name="companyName" optional placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
            <SelectField label="Type of Investor" name="investorType" required placeholder="Select One" value={formData.investorType} onChange={handleChange} options={["Angel Investor", "Venture Capitalist (VC)", "Private Equity (PE)", "Corporate Investor", "Other"]} />
            <InputField label="Email" name="email" type="email" required placeholder="Enter Email" value={formData.email} onChange={handleChange} />
            <InputField label="Mobile" name="mobile" type="tel" optional placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
            <InputField label="LinkedIn URL" name="linkedin" type="url" optional placeholder="Enter LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
            
            {/* Dynamic Location Logic */}
            <SelectField 
              label="Country" name="country" required placeholder="Select Country" 
              value={formData.country} onChange={handleCountryChange} 
              options={locationData.countries} 
            />
            
            {formData.country === "India" ? (
              <SelectField 
                label="State" name="state" required placeholder="Select State" 
                value={formData.state} onChange={handleStateChange} 
                options={Object.keys(locationData.indiaData)} 
              />
            ) : (
              <InputField 
                label="State" name="state" required placeholder="Enter State" 
                value={formData.state} onChange={handleChange} 
                disabled={!formData.country}
              />
            )}

            {formData.country === "India" ? (
              <SelectField 
                label="City" name="city" required placeholder={formData.state ? "Select City" : "Select State First"} 
                value={formData.city} onChange={handleChange} 
                options={formData.state ? locationData.indiaData[formData.state] : []} 
                disabled={!formData.state}
              />
            ) : (
              <InputField 
                label="City" name="city" required placeholder="Enter City" 
                value={formData.city} onChange={handleChange} 
                disabled={!formData.country}
              />
            )}

            {/* Radio Group: Investment Limit */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Label text="Investment Limit:" required />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "4px" }}>
                {["Upto 2 Lakh", "2-5 Lakh", "More than 5 Lakh"].map((limit) => (
                  <label key={limit} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: C.primaryText, cursor: "pointer", fontWeight: 500 }}>
                    <input 
                      type="radio" name="investmentLimit" value={limit} 
                      checked={formData.investmentLimit === limit} onChange={handleChange} required 
                      style={{ cursor: "pointer", accentColor: C.buttonBg, width: "16px", height: "16px" }}
                    />
                    {limit}
                  </label>
                ))}
              </div>
            </div>

            {/* Checkbox Group: Startup Stage */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              <Label text="Choice of startup stage for investing" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" }}>
                {["Ideation", "Validation", "Prototype/MVP", "Scaling"].map((stage) => (
                  <label key={stage} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: C.primaryText, cursor: "pointer", fontWeight: 500 }}>
                    <input 
                      type="checkbox" value={stage} 
                      checked={formData.startupStages.includes(stage)} onChange={handleStageChange} 
                      style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: C.buttonBg }} 
                    />
                    {stage}
                  </label>
                ))}
              </div>
            </div>

            <SelectField label="Number of companies funded" name="companiesFunded" optional placeholder="Select One" value={formData.companiesFunded} onChange={handleChange} options={["0 (First Time)", "1-5", "5-10", "10+"]} />

            {/* Security Code */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "10px", padding: "20px", background: C.bg, borderRadius: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "1px" }}>Security Code</span>
              <div style={{ fontSize: "22px", letterSpacing: "6px", color: C.primaryText, fontWeight: 800, fontFamily: "monospace" }}>
                {captcha}
              </div>
              <input 
                type="text" name="securityCode" value={formData.securityCode} onChange={handleChange} required placeholder="Enter code" 
                style={{ ...inputBaseStyles, width: "160px", textAlign: "center", borderColor: C.border, fontWeight: 600, letterSpacing: "2px" }} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: C.primaryText, cursor: "pointer", fontWeight: 500 }}>
                <input 
                  type="checkbox" name="isCertified" required checked={formData.isCertified} onChange={handleChange} 
                  style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: C.buttonBg }} 
                />
                I hereby certify that the above given information is true and accurate<span style={{ color: C.red }}>*</span>
              </label>
            </div>

            {/* SMALL & PROFESSIONAL SUBMIT BUTTON */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(31, 72, 110, 0.25)" }} 
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  background: C.buttonBg, // Dark Navy Blue
                  color: "#ffffff", 
                  border: "none", 
                  padding: "12px 32px", // Smaller padding
                  borderRadius: "8px", 
                  fontSize: "15px", // Slightly smaller font
                  fontWeight: 600, 
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%",
                  maxWidth: "220px", // Compact button size
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(28, 69, 108, 0.2)",
                  transition: "box-shadow 0.2s"
                }}
              >
                {loading ? "Submitting..." : <>Register Investor <span>→</span></>}
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestorRegistration;

/* --- REUSABLE COMPONENTS & STYLES --- */

const inputBaseStyles = {
  width: "100%", 
  padding: "14px 16px", 
  borderRadius: "8px", 
  border: `1.5px solid ${C.border}`,
  fontSize: "14px", 
  outline: "none", 
  transition: "border 0.2s, box-shadow 0.2s", 
  boxSizing: "border-box", 
  backgroundColor: C.white,
  color: C.primaryText,
  fontWeight: 500
};

const Label = ({ text, required, optional }) => (
  <label style={{ fontSize: "14px", fontWeight: 700, color: C.primaryText }}>
    {text} 
    {required && <span style={{ color: C.red }}> *</span>}
    {optional && <span style={{ color: C.textLight, fontWeight: 500, fontSize: "12px" }}> (Optional)</span>}
  </label>
);

const InputField = ({ label, required, optional, disabled, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <Label text={label} required={required} optional={optional} />
    <input 
      style={{ 
        ...inputBaseStyles, 
        opacity: disabled ? 0.6 : 1, 
        cursor: disabled ? "not-allowed" : "text" 
      }} 
      disabled={disabled} 
      {...props} 
      onFocus={(e) => { e.target.style.border = `1.5px solid ${C.buttonBg}`; e.target.style.boxShadow = `0 0 0 3px rgba(31, 72, 110, 0.1)`; }}
      onBlur={(e) => { e.target.style.border = `1.5px solid ${C.border}`; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, required, optional, options, placeholder, disabled, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <Label text={label} required={required} optional={optional} />
    <select 
      style={{ 
        ...inputBaseStyles, 
        color: props.value ? C.primaryText : C.textLight, 
        cursor: disabled ? "not-allowed" : "pointer", 
        opacity: disabled ? 0.6 : 1 
      }} 
      disabled={disabled} 
      {...props}
      onFocus={(e) => { e.target.style.border = `1.5px solid ${C.buttonBg}`; e.target.style.boxShadow = `0 0 0 3px rgba(31, 72, 110, 0.1)`; }}
      onBlur={(e) => { e.target.style.border = `1.5px solid ${C.border}`; e.target.style.boxShadow = "none"; }}
    >
      <option value="" disabled>{placeholder}</option>
      {options && options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);