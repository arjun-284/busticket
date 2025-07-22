
import React, { useContext } from 'react';
import { LanguageContext } from '../components/context/LanguageContext';

const ContactUs = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "We’re here to help you with your travel needs.",
      name: "Your Name",
      email: "Email Address",
      message: "Your Message",
      send: "Send Message",
      offices: "Our District Counters",
      mainOffice: "Main Office",
      contactInfo: "Contact Information",
      address: "Address",
      phone: "Phone",
      emailLabel: "Email",
      mapLabel: "Find Us on Map",
    },
    np: {
      title: "सम्पर्क गर्नुहोस्",
      subtitle: "तपाईंको यात्रा आवश्यकतामा हामी तपाईंलाई सहायता गर्न तयार छौं।",
      name: "तपाईंको नाम",
      email: "इमेल ठेगाना",
      message: "तपाईंको सन्देश",
      send: "सन्देश पठाउनुहोस्",
      offices: "हाम्रा जिल्ला काउन्टरहरू",
      mainOffice: "मुख्य कार्यालय",
      contactInfo: "सम्पर्क विवरण",
      address: "ठेगाना",
      phone: "फोन",
      emailLabel: "इमेल",
      mapLabel: "नक्सामा हेर्नुहोस्",
    }
  };

  const counters = [
    { district: "Kathmandu", phone: "01-5551234", email: "ktm@jaljalabus.com" },
    { district: "Pokhara", phone: "061-460987", email: "pokhara@jaljalabus.com" },
    { district: "Butwal", phone: "071-540123", email: "butwal@jaljalabus.com" },
    { district: "Biratnagar", phone: "021-460567", email: "biratnagar@jaljalabus.com" },
    { district: "Chitwan", phone: "056-531234", email: "chitwan@jaljalabus.com" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">
        {content[language].title}
      </h1>
      <p className="text-center text-gray-600 mb-10">{content[language].subtitle}</p>

      {/* Contact Form & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <form className="space-y-5">
            <input
              type="text"
              placeholder={content[language].name}
              className="w-full border p-3 rounded-md bg-blue-50"
              required
            />
            <input
              type="email"
              placeholder={content[language].email}
              className="w-full border p-3 rounded-md bg-blue-50"
              required
            />
            <textarea
              placeholder={content[language].message}
              rows="5"
              className="w-full border p-3 rounded-md bg-blue-50"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
            >
              {content[language].send}
            </button>
          </form>
        </div>

        {/* Office Info */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{content[language].contactInfo}</h2>
          <p className="mb-2">
            <strong>{content[language].mainOffice}:</strong><br />
            Jaljala Yatayat Pvt. Ltd.<br />
            Gongabu Bus Park, Kathmandu, Nepal
          </p>
          <p className="mb-2">
            <strong>{content[language].phone}:</strong> +977-1-4356789
          </p>
          <p className="mb-2">
            <strong>{content[language].emailLabel}:</strong> info@jaljalabus.com
          </p>
        </div>
      </div>

      {/* District Counters */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">{content[language].offices}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {counters.map((counter, index) => (
            <div key={index} className="border border-blue-200 bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-blue-600 font-bold text-lg">{counter.district}</h3>
              <p><strong>{content[language].phone}:</strong> {counter.phone}</p>
              <p><strong>{content[language].emailLabel}:</strong> {counter.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Google Map Embed */}
      <div>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">{content[language].mapLabel}</h2>
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Jaljala Yatayat Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.200845339445!2d85.31279831438425!3d27.70785843155895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197e14e2b7a7%3A0xe6075c4db43799a7!2sGongabu%20Bus%20Park!5e0!3m2!1sen!2snp!4v1638873694466!5m2!1sen!2snp"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
