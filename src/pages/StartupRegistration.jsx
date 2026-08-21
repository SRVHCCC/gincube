import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import locationData from "../data/locationData.json"; // Importing your JSON data

// Updated Color Palette based on the new design
const C = {
  primaryText: "#000000",
  gradientStart: "#7B61FF",
  gradientEnd: "#9D50FF",
  buttonBg: "#635BFF",
  border: "#E2E8F0",
  textLight: "#64748B",
  red: "#EF4444",
  blueText: "#3B82F6",
  bg: "#FFFFFF",
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
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: C.textLight, marginBottom: "60px" }}>
        <span>🏠 Home</span> » <span style={{ color: C.buttonBg }}>Startup Registration</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto", gap: "60px" }}>
        
        {/* Left Column: Heading & Info */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 10px 0", color: C.primaryText }}>
            Want to join G.Incube as a<br />Startup ?
          </h2>
          <h1 style={{ 
            fontSize: "64px", 
            fontWeight: 800, 
            margin: "0 0 40px 0",
            background: `linear-gradient(90deg, ${C.gradientStart}, ${C.gradientEnd})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Let’s fill<br />the form!
          </h1>
          <a href="mailto:connect@gincube.org" style={{ fontSize: "20px", color: C.primaryText, textDecoration: "underline" }}>
            connect@gincube.org
          </a>
        </div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ flex: "2 1 600px" }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Grid for 2-column fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginTop: "20px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>Security Code</span>
              <div style={{ fontSize: "18px", letterSpacing: "2px", color: C.textLight }}>{captcha}</div>
              <input 
                type="text" name="securityCode" value={formData.securityCode} onChange={handleChange} required
                style={{ ...inputBaseStyles, width: "150px", textAlign: "center", borderColor: C.primaryText }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  background: C.buttonBg, color: "#fff", border: "none", padding: "12px 32px",
                  borderRadius: "6px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                  width: "200px"
                }}
              >
                {loading ? "Submitting..." : "Register Now"}
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
  width: "100%", padding: "12px 16px", borderRadius: "6px", border: `1px solid ${C.border}`,
  fontSize: "14px", outline: "none", transition: "border 0.2s", boxSizing: "border-box", backgroundColor: "#fff"
};

const Label = ({ text, required, optional }) => (
  <label style={{ fontSize: "13px", fontWeight: 600, color: C.primaryText }}>
    {text} 
    {required && <span style={{ color: C.red }}> *</span>}
    {optional && <span style={{ color: C.blueText, fontWeight: 400 }}> (Optional)</span>}
  </label>
);

const InputField = ({ label, required, optional, disabled, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <Label text={label} required={required} optional={optional} />
    <input style={{ ...inputBaseStyles, opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "text" }} disabled={disabled} {...props} />
  </div>
);

const SelectField = ({ label, required, optional, options, placeholder, disabled, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <Label text={label} required={required} optional={optional} />
    <select 
      style={{ ...inputBaseStyles, color: props.value ? "#000" : C.textLight, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 }} 
      disabled={disabled} 
      {...props}
    >
      <option value="" disabled>{placeholder}</option>
      {options && options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);