import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import locationData from "../data/locationData.json"; // Importing your JSON data

// Color Palette 
const C = {
  primaryText: "#000000",
  gradientStart: "#7B61FF",
  gradientEnd: "#9D50FF",
  buttonBg: "#EF4444", // Red button color from the image
  border: "#E2E8F0",
  textLight: "#64748B",
  red: "#EF4444",
  blueText: "#3B82F6",
  bg: "#FFFFFF",
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
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: C.textLight, marginBottom: "60px" }}>
        <span>🏠 Home</span> » <span style={{ color: C.gradientStart }}>Partner Registration</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto", gap: "60px" }}>
        
        {/* Left Column (Headings) */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 10px 0", color: C.primaryText }}>
            Want to join G.Incube as a<br />Partner ?
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

        {/* Right Column (Form) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ flex: "2 1 600px", maxWidth: "700px" }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Two-Column Grid Setup specifically matching the image */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
              
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginTop: "30px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>Security Code</span>
              <div style={{ fontSize: "18px", letterSpacing: "2px", color: C.textLight, background: "#f8fafc", padding: "4px 12px", borderRadius: "4px" }}>
                {captcha}
              </div>
              <input type="text" name="securityCode" value={formData.securityCode} onChange={handleChange} required style={{ ...inputBaseStyles, width: "180px", textAlign: "center", borderColor: C.primaryText }} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: C.textLight, cursor: "pointer" }}>
                <input type="checkbox" name="isCertified" required checked={formData.isCertified} onChange={handleChange} style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: C.buttonBg }} />
                I hereby certify that the above given information is true and accurate<span style={{ color: C.red }}>*</span>
              </label>
            </div>

            {/* Red Button Matching the Image */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  background: C.buttonBg, // Dark Blue #1C456C
                  color: "#ffffff", 
                  border: "none", 
                  padding: "16px 40px",
                  borderRadius: "12px", 
                  fontSize: "16px", 
                  fontWeight: 700, 
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%",
                  maxWidth: "500px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 14px rgba(28, 69, 108, 0.2)"
                }}
              >
                {loading ? "Submitting..." : "Register Partner"}
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
  width: "100%", padding: "12px 16px", borderRadius: "6px", border: `1px solid ${C.border}`,
  fontSize: "14px", outline: "none", transition: "border 0.2s", boxSizing: "border-box", backgroundColor: "#fff"
};

const Label = ({ text, required, optional }) => (
  <label style={{ fontSize: "14px", fontWeight: 600, color: C.primaryText }}>
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