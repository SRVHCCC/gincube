import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import locationData from "../data/locationData.json"; // Importing your JSON data

// Updated Styling Variables (Navy Blue Professional Theme)
const C = {
  primaryText: "#0D1F2D", 
  gradientStart: "#1F486E", // Deep Navy 
  gradientEnd: "#287BBE", // Lighter blue
  buttonBg: "#1F486E", // Professional Navy Blue Button matching previous forms
  border: "#CBD5E1",
  textLight: "#64748B",
  red: "#EF4444",
  blueText: "#287BBE",
  bg: "#F8FAFC", // Professional light background
  white: "#FFFFFF",
};

const PartnerRegistration = () => {
  const [formData, setFormData] = useState({
    firmName: "",
    linkedin: "",
    partnerType: "",
    country: "",
    contactName: "",
    state: "",
    email: "",
    city: "",
    mobile: "",
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
        alert("Partner Data Submitted Successfully!");
        setFormData({
          firmName: "", linkedin: "", partnerType: "", country: "", contactName: "", 
          state: "", email: "", city: "", mobile: "", securityCode: "", isCertified: false
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
        <span>🏠 Home</span> » <span style={{ color: C.buttonBg, fontWeight: 600 }}>Partner Registration</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto", gap: "60px" }}>
        
        {/* Left Column (Headings) */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 10px 0", color: C.primaryText }}>
            Want to join G.Incube as a<br />Partner ?
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
            
            {/* Two-Column Grid Setup specifically matching the image */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", alignItems: "start" }}>
              
              {/* Form Left Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <InputField label="Name of Firm" name="firmName" required placeholder="Enter Firm Name" value={formData.firmName} onChange={handleChange} />
                <SelectField label="Please Specify your Type:" name="partnerType" required placeholder="Select One" value={formData.partnerType} onChange={handleChange} options={["Corporate", "Academic Institution", "Government", "Incubator", "Other"]} />
                <InputField label="Contact person name" name="contactName" required placeholder="Enter Name" value={formData.contactName} onChange={handleChange} />
                <InputField label="Email" name="email" type="email" required placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                <InputField label="Mobile" name="mobile" type="tel" optional placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
              </div>

              {/* Form Right Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <InputField label="LinkedIn URL" name="linkedin" type="url" optional placeholder="Enter LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
                
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
              </div>

            </div>

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
                  maxWidth: "220px", // Compact size
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(28, 69, 108, 0.2)",
                  transition: "box-shadow 0.2s"
                }}
              >
                {loading ? "Submitting..." : <>Register Partner <span>→</span></>}
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerRegistration;

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