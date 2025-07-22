import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../components/context/LanguageContext'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

// --- Modal CSS (no black background, subtle overlay) ---
const modalCSS = `
.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(24,38,67,0.12);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-card {
  background: #eaeaea;
  border-radius: 2rem;
  box-shadow: 0 10px 40px 8px #0074E433;
  max-width: 800px;
  width: 98vw;
  min-height: 350px;
  padding: 2.5rem 2rem 2rem 2rem;
  position: relative;
  animation: modalIn .22s cubic-bezier(.21,.83,.53,.99);
}
@keyframes modalIn { 0% { transform: translateY(38px) scale(.96); opacity: 0;} 100% {transform: none; opacity: 1;} }
.close-x {
  position: absolute; top: 30px; right: 38px; font-size: 2.2rem; font-weight: 500; color: #174ac7; cursor: pointer;
}
`;

// --- Modal Pop-up Component ---
const BusResultsModal = ({ show, onClose, buses, formData, content, handleBookNow }) => {
  if (!show) return null;
  return (
    <>
      <style>{modalCSS}</style>
      <div className="modal-bg">
        <div className="modal-card">
          <div className="text-2xl font-bold text-center text-blue-800 mb-8">
            {content.resultTitle}
            <span className="close-x" onClick={onClose} title="Close">&times;</span>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {buses.length === 0 ? (
              <div className='text-gray-500 text-lg'>{content.noBus}</div>
            ) : (
              buses.map((bus, idx) => (
                <div key={idx} className="rounded-xl bg-white shadow-lg w-[300px] p-0 flex flex-col items-center">
                  <img
                    src={bus.img || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"}
                    className="w-full h-40 object-cover rounded-t-xl"
                    alt={bus.title}
                  />
                  <div className="p-4 w-full">
                    <div className="text-blue-700 font-bold text-lg mb-1">{bus.title}</div>
                    <div className="flex justify-between text-gray-800 text-[15px] mb-2">
                      <span>{content.seats}: <b>{bus.passenger}</b></span>
                      <span>{content.price}: <b>Rs.{bus.price}</b></span>
                    </div>
                    <div className="text-gray-600 text-[15px]">
                      <span>{content.from}: <b>{bus.from?.name || bus.from}</b></span><br/>
                      <span>{content.to}: <b>{bus.to?.name || bus.to}</b></span>
                    </div>
                    <button
                      className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
                      onClick={() => handleBookNow(bus, formData)}
                    >
                      {content.book}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const fallbackBus =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

const featureIcons = [
  "https://cdn-icons-png.flaticon.com/512/2038/2038854.png", // Easy booking
  "https://cdn-icons-png.flaticon.com/512/2706/2706961.png", // Verified partners
  "https://cdn-icons-png.flaticon.com/512/747/747376.png",   // Customer support
  "https://cdn-icons-png.flaticon.com/512/1946/1946429.png", // Offers/discounts
];

const Home = () => {
  const { language } = useContext(LanguageContext);
  const [locations, setLocations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passenger: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const content = {
    en: {
      heroTitle: "Book Bus Tickets Online",
      heroDesc: "The fastest, most convenient way to travel across Nepal.",
      searchFrom: "From",
      searchTo: "To",
      searchDate: "Journey Date",
      searchPassenger: "Passengers",
      searchBtn: "Search Bus",
      noBus: "No buses found for this route/date.",
      resultTitle: "Available Buses",
      whyUs: "Why Choose Us?",
      features: [
        { title: "Easy Booking", desc: "Book tickets in minutes from your phone or computer." },
        { title: "Trusted Partners", desc: "Ride with verified and reliable bus operators." },
        { title: "24/7 Support", desc: "Round-the-clock help, before and after your trip." },
        { title: "Offers & Discounts", desc: "Best deals and seasonal discounts on bus fares." }
      ],
      book: "Book Now",
      seats: "Seats",
      price: "Price",
      from: "From",
      to: "To"
    },
    np: {
      heroTitle: "बस टिकट अनलाइन बुक गर्नुहोस्",
      heroDesc: "नेपालभर छिटो र सुविधाजनक यात्राको नयाँ तरिका।",
      searchFrom: "जहाँबाट",
      searchTo: "जहाँसम्म",
      searchDate: "यात्रा मिति",
      searchPassenger: "यात्रुको संख्या",
      searchBtn: "बस खोज्नुहोस्",
      noBus: "यो रुट/मितिमा कुनै बस फेला परेन।",
      resultTitle: "उपलब्ध बसहरू",
      whyUs: "हामीलाई किन छान्ने?",
      features: [
        { title: "सजिलो बुकिङ", desc: "फोन वा कम्प्युटरबाट केही मिनेटमै टिकट बुक गर्नुहोस्।" },
        { title: "विश्वासिलो साझेदार", desc: "प्रमाणित र भरपर्दो बस सञ्चालकहरूसँग यात्रा गर्नुहोस्।" },
        { title: "२४/७ सहयोग", desc: "यात्रा अघि र पछि चौबीसै घण्टा सहयोग।" },
        { title: "अफर तथा छुट", desc: "बस भाडामा उत्कृष्ट डिल र छुटहरू पाइने।" }
      ],
      book: "बुक गर्नुहोस्",
      seats: "सिट",
      price: "मूल्य",
      from: "जहाँबाट",
      to: "जहाँसम्म"
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations');
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data.locations || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch buses');
      }
      const data = await response.json();
      setBuses(data.buses || []);
      setShowModal(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleBookNow = (bus, formData) => {
    navigate('/booking', { state: { bus, formData } });
  };

  // fallback bus image for cards
  const BusImg = ({ src }) => {
    const [error, setError] = useState(false);
    return (
      <img
        className="w-full h-40 object-cover bg-blue-100"
        src={error ? fallbackBus : src}
        alt="Bus"
        onError={() => setError(true)}
      />
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pb-14 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center w-full min-h-[350px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 overflow-hidden shadow-lg">
        <div className="absolute left-[-120px] top-[-100px] w-[260px] h-[260px] bg-blue-200 opacity-25 rounded-full blur-3xl"></div>
        <div className="absolute right-[-80px] bottom-[-60px] w-[200px] h-[200px] bg-blue-400 opacity-25 rounded-full blur-3xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 pt-8 z-10 max-w-6xl w-full mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
              {content[language].heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-2 font-light">
              {content[language].heroDesc}
            </p>
          </div>
          <div className="flex-1 flex items-end justify-center">
            <div className="animate-bounce-slow">
              {/* Simple animated SVG Bus */}
              <svg width="230" height="120" viewBox="0 0 230 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="40" width="200" height="50" rx="18" fill="#2196F3"/>
                <rect x="30" y="60" width="50" height="15" rx="5" fill="#fff"/>
                <rect x="100" y="60" width="40" height="15" rx="5" fill="#fff"/>
                <rect x="170" y="60" width="30" height="15" rx="5" fill="#fff"/>
                <circle cx="40" cy="95" r="13" fill="#222"/>
                <circle cx="180" cy="95" r="13" fill="#222"/>
                <circle cx="40" cy="95" r="8" fill="#fff"/>
                <circle cx="180" cy="95" r="8" fill="#fff"/>
                <rect x="210" y="55" width="12" height="13" rx="4" fill="#1E88E5"/>
                <rect x="8" y="55" width="8" height="13" rx="4" fill="#1E88E5"/>
              </svg>
            </div>
          </div>
        </div>
        <style>
          {`@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-26px);} }
          .animate-bounce-slow { animation: bounce 2.6s infinite; }`}
        </style>
      </div>

      {/* Search card */}
      <div className="w-full flex justify-center absolute left-0 right-0" style={{ top: "260px" }}>
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/90 rounded-3xl shadow-2xl p-7 w-[97%] max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 border border-blue-100"
        >
          <select
            name='from'
            value={formData.from}
            onChange={handleChange}
            className='flex-1 p-2 border border-blue-200 rounded-lg text-lg bg-blue-50'
            required
          >
            <option value=''>{content[language].searchFrom}</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>{loc.name}</option>
            ))}
          </select>
          <select
            name='to'
            value={formData.to}
            onChange={handleChange}
            className='flex-1 p-2 border border-blue-200 rounded-lg text-lg bg-blue-50'
            required
          >
            <option value=''>{content[language].searchTo}</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>{loc.name}</option>
            ))}
          </select>
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='flex-1 p-2 border border-blue-200 rounded-lg text-lg bg-blue-50'
            required
          />
          <input
            type='number'
            name='passenger'
            value={formData.passenger}
            onChange={handleChange}
            className='flex-1 p-2 border border-blue-200 rounded-lg text-lg bg-blue-50'
            min='1'
            placeholder={content[language].searchPassenger}
            required
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-6 py-2 rounded-xl text-lg font-bold hover:bg-blue-700 shadow transition'
          >
            {content[language].searchBtn}
          </button>
        </form>
      </div>

      {/* Why Us Features */}
      <div className="max-w-6xl mx-auto mt-44 md:mt-52 mb-12 px-3">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-blue-700 drop-shadow">
          {content[language].whyUs}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {content[language].features.map((ft, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-xl border-t-4 border-blue-400 flex flex-col items-center p-7 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 mb-3 rounded-full bg-blue-50 flex items-center justify-center shadow">
                <img src={featureIcons[i]} alt={ft.title} className="w-9 h-9 group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">{ft.title}</h3>
              <p className="text-gray-600 text-center">{ft.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Destinations */}
      <div className="max-w-6xl mx-auto mb-16 px-3">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-blue-600">
          {language === "en" ? "Top Destinations" : "लोकप्रिय गन्तव्यहरू"}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            {
              name: language === "en" ? "Kathmandu" : "काठमाडौं",
              img: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: language === "en" ? "Pokhara" : "पोखरा",
              img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: language === "en" ? "Chitwan" : "चितवन",
              img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: language === "en" ? "Biratnagar" : "विराटनगर",
              img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: language === "en" ? "Butwal" : "बुटवल",
              img: "https://images.unsplash.com/photo-1484240950161-cb6e1a3e0b1b?auto=format&fit=crop&w=400&q=80",
            },
          ].map((city, idx) => (
            <div key={idx} className="min-w-[170px] rounded-xl bg-white/90 border shadow hover:shadow-xl mr-2 transition-all cursor-pointer group">
              <img src={city.img} alt={city.name} className="w-full h-28 object-cover rounded-t-xl" />
              <div className="p-3 font-semibold text-center text-blue-700 group-hover:underline">{city.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile App Coming Soon */}
      <div className="max-w-2xl mx-auto mb-10 px-4">
        <div className="bg-gradient-to-r from-blue-400 to-blue-700 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-white relative">
          <h3 className="text-xl font-bold mb-2">{language === "en" ? "Mobile App Coming Soon!" : "मोबाइल एप चाँडै आउँदैछ!"}</h3>
          <div className="mb-4">{language === "en"
            ? "Book, pay, and get tickets faster on your phone — launching soon."
            : "मोबाइलबाट छिटो बुक, भुक्तानी र टिकट पाउनुहोस् — चाँडै उपलब्ध हुनेछ।"}
          </div>
          <div className="flex gap-4 opacity-50 cursor-not-allowed">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732212.png" alt="Play Store" className="w-9 h-9 grayscale" />
            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="App Store" className="w-9 h-9 grayscale" />
          </div>
          <div className="text-xs mt-3 text-blue-200 font-semibold tracking-wide">
            {language === "en" ? "App downloads coming soon" : "डाउनलोड चाँडै उपलब्ध हुनेछ"}
          </div>
        </div>
      </div>

      {/* Bus Results Modal */}
      <BusResultsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        buses={buses}
        formData={formData}
        content={content[language]}
        handleBookNow={handleBookNow}
      />

      {/* Error (outside modal) */}
      {errorMessage && (
        <div className="fixed left-0 right-0 top-2 z-40">
          <div className="mx-auto max-w-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl shadow text-center text-[17px]">
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
