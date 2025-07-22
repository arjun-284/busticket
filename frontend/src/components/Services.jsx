import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../components/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { language } = useContext(LanguageContext);
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Our Bus Services",
      subtitle: "Find the right bus for your destination.",
      sn: "S.N.",
      busTitle: "Title",
      capacity: "Seats",
      from: "From",
      to: "To",
      price: "Price (Rs.)",
      number: "Bus Number",
      renew: "Renew Date",
      book: "Book Now",
      noBus: "No bus records found."
    },
    np: {
      title: "हाम्रो बस सेवा",
      subtitle: "तपाईंको गन्तव्यको लागि सही बस खोज्नुहोस्।",
      sn: "क्र.सं.",
      busTitle: "शिर्षक",
      capacity: "सिट संख्या",
      from: "बाट",
      to: "सम्म",
      price: "मूल्य (रु.)",
      number: "बस नम्बर",
      renew: "नवीकरण मिति",
      book: "बुक गर्नुहोस्",
      noBus: "कुनै बस विवरण भेटिएन।"
    }
  };

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/bus/show', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setBuses(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to fetch buses:", error);
      }
    };
    fetchBuses();
  }, []);

  const handleBook = (bus) => {
    navigate('/booking', { state: { bus } });
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
        {content[language].title}
      </h2>
      <p className="text-center text-gray-600 mb-6">{content[language].subtitle}</p>

      <div className="overflow-x-auto">
        <table className="w-full border border-blue-200 shadow">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-3">{content[language].sn}</th>
              <th className="p-3">{content[language].busTitle}</th>
              <th className="p-3">{content[language].capacity}</th>
              <th className="p-3">{content[language].from}</th>
              <th className="p-3">{content[language].to}</th>
              <th className="p-3">{content[language].price}</th>
              <th className="p-3">{content[language].number}</th>
              <th className="p-3">{content[language].renew}</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {buses.length > 0 ? (
              buses.map((bus, index) => (
                <tr key={bus._id} className="text-center border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{bus.title}</td>
                  <td className="p-2">{bus.passenger}</td>
                  <td className="p-2">{bus.from?.name || bus.from}</td>
                  <td className="p-2">{bus.to?.name || bus.to}</td>
                  <td className="p-2">Rs. {bus.price}</td>
                  <td className="p-2">{bus.bus_number}</td>
                  <td className="p-2">
                    {bus.renew_date
                      ? new Date(bus.renew_date).toISOString().split('T')[0]
                      : "-"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleBook(bus)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      {content[language].book}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-500">
                  {content[language].noBus}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
