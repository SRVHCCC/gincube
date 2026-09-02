import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import locationData from "../data/locationData.json"; // Importing your JSON data

// Updated Color Palette matching the provided button image and professional theme
const C = {
  primaryText: "#0D1F2D", // Dark slate for headings
  gradientStart: "#1F486E", // Deep Navy from the button
  gradientEnd: "#287BBE", // Lighter blue for gradient effect
  buttonBg: "#1F486E", // Exact color from your uploaded image
  border: "#CBD5E1",
  textLight: "#64748B",
  red: "#EF4444",
  blueText: "#287BBE",
  bg: "#F8FAFC", // Light modern background
  white: "#FFFFFF",
};

const StartupRegistration = () => {
  const [formData, setFormData] = useState({
    startupName: "",
    email: "",
    mobile: "",
    stage: "",
    sectors: "",
    country: "",
    state: "",
    city: "",
    dpiit: "",
    website: "",
    summary: "",
    securityCode: "",
  });

  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate a random security code on mount
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for Country selection
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      state: "", // Reset state when country changes
      city: "",  // Reset city when country changes
    });
  };

  // Handler for State selection (Only triggers for India)
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      city: "", // Reset city when state changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Captcha Validation
    if (formData.securityCode !== captcha) {
      alert("Security code does not match. Please try again.");
      generateCaptcha();
      setFormData({ ...formData, securityCode: "" });
      return;
    }

    setLoading(true);

    try {
      // --- REPLACE THIS WITH YOUR ACTUAL API URL ---
      const response = await fetch("YOUR_BACKEND_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Startup Data Submitted Successfully!");
        // Reset form
        setFormData({
          startupName: "", email: "", mobile: "", stage: "", sectors: "",
          country: "", state: "", city: "", dpiit: "", website: "", summary: "", securityCode: ""
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
        <span>🏠 Home</span> » <span style={{ color: C.buttonBg, fontWeight: 600 }}>Startup Registration</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto", gap: "60px" }}>
        
        {/* Left Column: Heading & Info */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 10px 0", color: C.primaryText }}>
            Want to join G.Incube as a<br />Startup ?
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

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ flex: "2 1 600px", background: C.white, padding: "40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(21, 67, 107, 0.05)" }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Grid for 2-column fields */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              <InputField label="Startup Name" name="startupName" required placeholder="Enter your startup name" value={formData.startupName} onChange={handleChange} />
              <InputField label="Email" name="email" type="email" required placeholder="Email ID" value={formData.email} onChange={handleChange} />
              
              <InputField label="Mobile" name="mobile" type="tel" required placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
              <SelectField label="Stage" name="stage" optional placeholder="Select Stage" value={formData.stage} onChange={handleChange} options={["Idea", "MVP", "Early Traction", "Scaling"]} />
              
              <SelectField label="Verticals Sectors" name="sectors" optional placeholder="Select Sectors" value={formData.sectors} onChange={handleChange} options={["EdTech", "FinTech", "HealthTech", "E-commerce","Others"]} />
              
              {/* Dynamic Country Dropdown */}
              <SelectField 
                label="Country" name="country" required placeholder="Select Country" 
                value={formData.country} onChange={handleCountryChange} 
                options={locationData.countries} 
              />
              
              {/* Dynamic State Dropdown/Input */}
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

              {/* Dynamic City Dropdown/Input */}
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
              
              <InputField label="DPIIT Registration Number" name="dpiit" optional placeholder="" value={formData.dpiit} onChange={handleChange} />
              <InputField label="Website Address" name="website" type="url" optional placeholder="" value={formData.website} onChange={handleChange} />
            </div>

            {/* Full width Textarea */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Label text="Product & Services Summary" required />
              <textarea 
                name="summary" required value={formData.summary} onChange={handleChange}
                style={{ ...inputBaseStyles, minHeight: "120px", resize: "vertical" }}
              />
            </div>

            {/* Security Code */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "10px", padding: "20px", background: C.bg, borderRadius: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "1px" }}>Security Code</span>
              <div style={{ fontSize: "22px", letterSpacing: "6px", color: C.primaryText, fontWeight: 800, fontFamily: "monospace" }}>{captcha}</div>
              <input 
                type="text" name="securityCode" value={formData.securityCode} onChange={handleChange} required placeholder="Enter code"
                style={{ ...inputBaseStyles, width: "160px", textAlign: "center", borderColor: C.border, fontWeight: 600, letterSpacing: "2px" }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(31, 72, 110, 0.25)" }} 
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  background: C.buttonBg, 
                  color: "#fff", 
                  border: "none", 
                  padding: "16px 40px",
                  borderRadius: "8px", 
                  fontSize: "16px", 
                  fontWeight: 600, 
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%", 
                  maxWidth: "280px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "box-shadow 0.2s"
                }}
              >
                {loading ? "Submitting..." : <>Register Now <span>→</span></>}
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StartupRegistration;

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