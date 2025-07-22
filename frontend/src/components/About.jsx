import React, { useContext } from "react";
import { LanguageContext } from "../components/context/LanguageContext";

const About = () => {
  const { language } = useContext(LanguageContext);

  // Images for cards
  const cardImages = [
    "https://cdn-icons-png.flaticon.com/512/685/685686.png",
    "https://cdn-icons-png.flaticon.com/512/408/408360.png",
    "https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
  ];

  // Bilingual content
  const content = {
    en: {
      about: "About",
      us: "Us",
      tagline: "Where your journey begins, with trust and convenience.",
      whyChoose: "Why Choose Us?",
      subtext:
        "Nepal’s most user-friendly bus ticketing. Fast booking, trusted partners, 24/7 support—your smart choice for every trip.",
      cards: [
        {
          title: "Easy Online Booking",
          desc: "Book tickets in a few clicks, anytime, anywhere. Made for smooth & fast ticketing."
        },
        {
          title: "Verified Buses",
          desc: "Only trusted and verified bus operators, for your safety and peace of mind."
        },
        {
          title: "24/7 Customer Care",
          desc: "Need help? Our support team is available round the clock for you."
        }
      ],
      teamHeading: "Meet the Team",
      team: [
        {
          name: "Suman Shrestha",
          role: "Founder & CEO"
        },
        {
          name: "Rita Gurung",
          role: "Operations Lead"
        },
        {
          name: "Dipesh Thapa",
          role: "Lead Developer"
        }
      ],
      contactHeading: "Need Help or Have a Query?",
      contactText: "Contact our team 24/7 for support, feedback, or partnership!",
      email: "support@busticketnepal.com",
      reply: "We reply within a few hours."
    },
    np: {
      about: "हाम्रो",
      us: "बारे",
      tagline: "जहाँ तपाईंको यात्रा विश्वास र सुविधासँग सुरु हुन्छ।",
      whyChoose: "हामीलाई किन छान्ने?",
      subtext:
        "नेपालकै सबैभन्दा प्रयोगकर्ता मैत्री बस टिकट सेवा। छिटो बुकिङ, भरपर्दो साझेदार, २४/७ सहयोग—प्रत्येक यात्राका लागि तपाईंको स्मार्ट छनोट।",
      cards: [
        {
          title: "सजिलो अनलाइन बुकिङ",
          desc: "कुनै पनि समयमा, छिटो र सजिलै टिकट बुक गर्नुहोस्। हाम्रो प्लेटफर्म छिटो र सहज छ।"
        },
        {
          title: "विश्वासिलो बस सेवा",
          desc: "हामीले केवल भरपर्दो तथा प्रमाणित बस सञ्चालकहरूसँग सहकार्य गर्छौं। तपाईंको सुरक्षाका लागि।"
        },
        {
          title: "२४/७ ग्राहक सेवा",
          desc: "सहयोग चाहिएको छ? हाम्रो टोली चौबीसै घण्टा तपाईंको लागि उपलब्ध छ।"
        }
      ],
      teamHeading: "हाम्रो टिम",
      team: [
        {
          name: "सुमन श्रेष्ठ",
          role: "संस्थापक तथा प्रमुख कार्यकारी अधिकृत"
        },
        {
          name: "रिता गुरुङ",
          role: "अपरेसन प्रमुख"
        },
        {
          name: "दिपेश थापा",
          role: "प्रमुख विकासकर्ता"
        }
      ],
      contactHeading: "सहयोग वा जिज्ञासा?",
      contactText: "सल्लाह, प्रतिक्रिया वा सहकार्यका लागि २४/७ सम्पर्क गर्न सक्नुहुन्छ।",
      email: "support@busticketnepal.com",
      reply: "हामी छिट्टै जवाफ दिनेछौं।"
    }
  };

  const teamImages = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/43.jpg",
    "https://randomuser.me/api/portraits/men/76.jpg"
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50">
      <section className="flex flex-col md:flex-row items-center justify-between p-8 border-b mb-10">
        <div>
          <h1 className="text-7xl font-bold text-gray-800">
            {content[language].about} <span className="text-blue-600">{content[language].us}</span>
          </h1>
          <p className="mt-6 text-2xl text-gray-700">{content[language].tagline}</p>
        </div>
        <img
          className="w-72 h-60 rounded-xl border-4 border-blue-300 object-cover shadow-lg"
          src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg"
          alt=""
        />
      </section>
      <section className="grid justify-items-center p-8">
        <h2 className="text-4xl py-4 font-bold text-blue-700">{content[language].whyChoose}</h2>
        <p className="w-full md:w-[65%] text-lg md:text-2xl text-center text-gray-700 mb-10">
          {content[language].subtext}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {content[language].cards.map((card, idx) => (
            <div key={idx}
              className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-400 group"
            >
              <img src={cardImages[idx]} alt={card.title} className="w-20 h-20 mb-3 rounded-full shadow" />
              <h3 className="text-2xl font-bold text-blue-700 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-base text-center">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-12 px-6 md:px-0 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-10 drop-shadow">
          {content[language].teamHeading}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          {content[language].team.map((person, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white/70 backdrop-blur-lg rounded-2xl px-6 py-7 shadow-xl border-l-4 border-blue-400">
              <img src={teamImages[idx]} alt={person.name} className="w-24 h-24 rounded-full shadow-xl mb-3 border-4 border-blue-200" />
              <div className="text-xl font-semibold text-blue-800">{person.name}</div>
              <div className="text-gray-600 mb-2">{person.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact/Support CTA */}
      <section className="relative py-16 px-4 md:px-0 z-10 flex justify-center items-center">
        <div className="bg-blue-700 rounded-3xl shadow-2xl py-10 px-8 md:px-16 flex flex-col items-center max-w-3xl w-full text-white">
          <h3 className="text-3xl font-bold mb-2 drop-shadow-md">{content[language].contactHeading}</h3>
          <div className="text-lg mb-4 text-blue-100">{content[language].contactText}</div>
          <a href={`mailto:${content[language].email}`} className="bg-white text-blue-700 font-bold px-6 py-2 rounded-xl hover:bg-blue-200 hover:text-blue-900 shadow transition">
            {content[language].email}
          </a>
          <div className="mt-2 text-blue-200 text-sm">{content[language].reply}</div>
        </div>
      </section>
    </div>
  );
};

export default About;
