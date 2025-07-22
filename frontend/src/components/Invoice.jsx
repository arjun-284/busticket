import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import logo from "../assets/Jaljala yatayat logo.png";
import html2canvas from "html2canvas";
import { QRCode } from "react-qrcode-logo";

const Invoice = () => {
  const { state } = useLocation();
  const [invoiceData, setInvoiceData] = useState(null);
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id");
  const printRef = useRef();

  useEffect(() => {
    if (bookingId) {
      const fetchInvoiceData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/get-invoice-data/${bookingId}`);
          if (!response.ok) throw new Error("इनभ्वाइस डेटा लोड हुन सकेन");
          const data = await response.json();
          setInvoiceData(data);
        } catch (error) {
          console.error("इनभ्वाइस डेटा लोडमा समस्या:", error);
        }
      };
      fetchInvoiceData();
    }
  }, [bookingId]);

  const data = state?.invoiceData?.newBooking || invoiceData;
  const message = state?.invoiceData?.message || "बुकिङ सफल";

  const seatList = (data?.selectedSeatNos || []).length > 0
    ? data.selectedSeatNos.join(", ")
    : "N/A";

  const handlePrint = () => {
    if (printRef.current) window.print();
  };

  const handleDownloadImage = () => {
    if (printRef.current) {
      html2canvas(printRef.current, { useCORS: true, scale: 2 }).then((canvas) => {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "बस-टिकट-इनभ्वाइस.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  if (!data) {
    return <div>इनभ्वाइस डेटा उपलब्ध छैन। कृपया पहिला टिकट बुक गर्नुहोस्।</div>;
  }

  return (
    <>
      {/* ACTION BAR */}
      <div className="flex justify-end gap-4 p-4 max-w-4xl mx-auto print:hidden">
        <button onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700">
          🖨 प्रिन्ट गर्नुहोस्
        </button>
        <button onClick={handleDownloadImage}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-700">
          🖼️ इमेज डाउनलोड गर्नुहोस्
        </button>
      </div>

      {/* INVOICE BOX */}
      <div
        ref={printRef}
        className="ticket-border max-w-4xl mx-auto p-8 bg-white border border-blue-400 rounded-2xl shadow-2xl print:shadow-none print:border print:bg-white"
        style={{ background: "linear-gradient(120deg,#f5faff 70%,#e3edfa 100%)" }}
      >
        {/* HEADER WITH LOGO + QR */}
        <div className="flex flex-row items-center justify-between mb-7 pb-4 border-b-2 border-blue-700" style={{ minHeight: 100 }}>
          <div className="flex flex-row items-center gap-6">
            <img
              src={logo}
              alt="Jaljala Yatayat Logo"
              style={{
                height: "72px",
                width: "72px",
                borderRadius: "14px",
                border: "2px solid #1476b8",
                objectFit: "cover",
                background: "#fff"
              }}
            />
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-1">
                जलजला यातायात प्रा.लि.
              </div>
              <div className="text-blue-700 font-semibold mb-1">
                स्थापना: २०६४ | सेवा: सम्पूर्ण नेपालभरि
              </div>
              <div className="text-gray-700 text-sm">
                फोन: ९८०००००००० | इमेल: info@jaljalayatayat.com
              </div>
              <div className="text-gray-700 text-sm">
                ठेगाना: बागलुङ, नेपाल
              </div>
            </div>
          </div>
          {/* QR CODE RIGHT SIDE */}
          <div className="border p-2 rounded bg-white flex flex-col items-center">
            <QRCode
              value={`https://jaljalayatayat.com/verify-ticket?id=${data._id}`}
              size={88}
              logoImage={logo}
              logoWidth={20}
              ecLevel="H"
            />
            <p className="text-xs text-center mt-1 text-gray-600">
              भेरिफाई गर्न Scan गर्नुहोस्
            </p>
          </div>
        </div>

        {/* REST OF INVOICE */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-blue-700">🚌 बस टिकट इनभ्वाइस</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-semibold shadow">
            {message}
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="text-gray-700 mb-2">
            <div className="font-bold text-lg">
              इनभ्वाइस नं.: <span className="font-normal">{data._id}</span>
            </div>
            <div>
              मिति: {new Date(data.createdAt).toLocaleDateString("ne-NP")}
            </div>
          </div>
          <div className="text-right mb-2">
            <div className="font-bold">
              भुक्तानी विधि: <span className="font-normal">{data.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">ग्राहक विवरण:</h3>
            <p className="text-gray-700">पूरा नाम: <b>{data.fullName}</b></p>
            <p className="text-gray-700">इमेल: <b>{data.email}</b></p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">बस विवरण:</h3>
            <p className="text-gray-700">बसको नाम: <b>{data.busTitle}</b></p>
            <p className="text-gray-700">बस नम्बर: <b>{data.bus_number}</b></p>
            <p className="text-gray-700">प्रस्थान मिति: <b>{data.date}</b></p>
            <p className="text-gray-700">छानिएका सिटहरू: <b>{seatList}</b></p>
          </div>
        </div>

        <table className="w-full table-auto mb-8 shadow rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 bg-blue-50">देखि</th>
              <th className="text-left py-2 px-4 bg-blue-50">सम्म</th>
              <th className="text-right py-2 px-4 bg-blue-50">यात्री</th>
              <th className="text-right py-2 px-4 bg-blue-50">कुल</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t py-2 px-4">{data.from}</td>
              <td className="border-t py-2 px-4">{data.to}</td>
              <td className="border-t py-2 px-4 text-right">{data.passenger}</td>
              <td className="border-t py-2 px-4 text-right">रु. {data.totalPrice}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-2/3 text-right">
            <p className="text-2xl font-bold text-blue-800">
              कुल रकम
              <span className="text-sm mr-2 ml-2">(१३% भ्याट सहित)</span>: रु. {data.totalPrice}
            </p>
          </div>
        </div>

        <div className="text-center text-md text-blue-700 font-semibold py-3">
          <span>हाम्रो सँग यात्रा गर्नुभएकोमा धन्यवाद!</span>
          <br />
          <span className="text-sm text-blue-500">शुभ यात्रा!</span>
        </div>
      </div>
    </>
  );
};

export default Invoice;
