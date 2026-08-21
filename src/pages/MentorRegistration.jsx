import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- COMPLETE INDIA STATES & DISTRICTS DATA ---
const indiaData = {
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "SPSR Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukkia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Saraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "SBS Nagar", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Balia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

// Styling Variables
const C = {
  primaryText: "#000000",
  gradientStart: "#7B61FF",
  gradientEnd: "#9D50FF",
  // Button Color updated as per image_089ece.png
  buttonBg: "#1C456C", 
  border: "#E2E8F0",
  textLight: "#64748B",
  red: "#EF4444",
  blueText: "#3B82F6",
  bg: "#FFFFFF",
};

const MentorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    linkedin: "",
    country: "India", // Defaulted to India for the state/city logic
    state: "",
    city: "",
    yearsInMentorship: "",
    sectors: [],
    securityCode: "",
    isCertified: false,
  });

  const [availableCities, setAvailableCities] = useState([]);
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

  // Standard inputs handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "isCertified") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Special handler for State to update Cities dynamically
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" }); // Reset city
    
    if (indiaData[selectedState]) {
      setAvailableCities(indiaData[selectedState]);
    } else {
      setAvailableCities([]);
    }
  };

  // Handle multi-select checkboxes for Sector Expertise
  const handleSectorChange = (e) => {
    const { value, checked } = e.target;
    let updatedSectors = [...formData.sectors];
    
    if (checked) {
      updatedSectors.push(value);
    } else {
      updatedSectors = updatedSectors.filter((sector) => sector !== value);
    }
    
    setFormData({ ...formData, sectors: updatedSectors });
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
        alert("Mentor Data Submitted Successfully!");
        setFormData({
          fullName: "", email: "", mobile: "", linkedin: "", country: "India", 
          state: "", city: "", yearsInMentorship: "", sectors: [], 
          securityCode: "", isCertified: false
        });
        setAvailableCities([]);
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

  const sectorOptions = [
    "Legal Expert", "Finance Expert", "Account Expert", "Marketing Expert",
    "IT Expert", "Digital Marketing", "Business Strategy Expert", 
    "Women Entrepreneur Expert", "Startup Expert", "Personality Development Expert", 
    "Communication Expert"
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, fontFamily: "sans-serif", padding: "40px" }}>
      
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: C.textLight, marginBottom: "60px" }}>
        <span>🏠 Home</span> » <span style={{ color: "#635BFF" }}>Mentor Registration</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto", gap: "60px" }}>
        
        {/* Left Column */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 10px 0", color: C.primaryText }}>
            Want to join G.Incube as a<br />Mentor ?
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
            
            <InputField label="Full Name" name="fullName" required placeholder="Enter Name" value={formData.fullName} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" required placeholder="Enter Email" value={formData.email} onChange={handleChange} />
            <InputField label="Mobile" name="mobile" type="tel" required placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
            <InputField label="LinkedIn URL" name="linkedin" type="url" optional placeholder="Enter LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
            
            <SelectField label="Country" name="country" required value={formData.country} onChange={handleChange} options={["India"]} />
            
            {/* Dynamic State Dropdown */}
            <SelectField 
              label="State" name="state" required placeholder="Select State" 
              value={formData.state} onChange={handleStateChange} 
              options={Object.keys(indiaData)} 
            />

            {/* Dynamic City (Jile) Dropdown */}
            <SelectField 
              label="City" name="city" required placeholder={formData.state ? "Select City" : "Select State First"}
              value={formData.city} onChange={handleChange} 
              options={availableCities} 
              disabled={!formData.state}
            />

            <SelectField label="Number of years in Mentorship" name="yearsInMentorship" optional placeholder="Select One" value={formData.yearsInMentorship} onChange={handleChange} options={["1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"]} />

            {/* Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              <Label text="Sector Expertise:" optional />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                {sectorOptions.map((sector, index) => (
                  <label key={index} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: C.textLight, cursor: "pointer" }}>
                    <input type="checkbox" value={sector} checked={formData.sectors.includes(sector)} onChange={handleSectorChange} style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                    {sector}
                  </label>
                ))}
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
                <input type="checkbox" name="isCertified" required checked={formData.isCertified} onChange={handleChange} style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                I hereby certify that the above given information is true and accurate<span style={{ color: C.red }}>*</span>
              </label>
            </div>

            {/* UPDATED BUTTON MATCHING IMAGE */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  background: C.buttonBg, // Dark Blue #1C456C
                  color: "#ffffff", 
                  border: "none", 
                  padding: "16px 40px",
                  borderRadius: "12px", // Smooth rounded corners
                  fontSize: "16px", 
                  fontWeight: 700, 
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%",
                  maxWidth: "500px", // Makes it long and horizontal like the image
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 14px rgba(28, 69, 108, 0.2)" // subtle shadow
                }}
              >
                {loading ? "Submitting..." : "Register Now →"}
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorRegistration;

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

const InputField = ({ label, required, optional, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <Label text={label} required={required} optional={optional} />
    <input style={inputBaseStyles} {...props} />
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
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);