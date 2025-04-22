import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Invoice = () => {
   const { state } = useLocation();
   const [invoiceData, setInvoiceData] = useState(null);
   const [searchParams] = useSearchParams();
   const bookingId = searchParams.get("id");

   useEffect(() => {
      if (bookingId) {
         const fetchInvoiceData = async () => {
            try {
               const response = await fetch(`http://localhost:5000/api/get-invoice-data/${bookingId}`);
               if (!response.ok) {
                  throw new Error("Failed to fetch invoice data");
               }
               const data = await response.json();
               console.log("Fetched Data:", data);
               setInvoiceData(data);
            } catch (error) {
               console.error("Error fetching invoice data:", error);
            }
         };
         fetchInvoiceData();
      }
   }, [bookingId]);

   // Get invoice details from state or API response
   const data = state?.invoiceData?.newBooking || invoiceData;
   const message = state?.invoiceData?.message || "Booking Success";

   // If no invoice data is available, show a message
   if (!data) {
      return <div>No invoice data available. Please book a ticket first.</div>;
   }

   return (
      <>
         <div className="flex justify-around gap-4 w-full h-30 p-4 border-b-1 rounded-lg mb-4">
            <div>
               <h1 className="text-7xl mt-3 font-bold text-gray-800">{message}</h1>
            </div>
            <img
               className="object-fill"
               src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg"
               alt="Bus"
            />
         </div>

         <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
                  <p className="text-gray-600">Invoice #: {data._id}</p>
               </div>
               <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">Date: {new Date(data.createdAt).toISOString().split("T")[0]}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div>
                  <h2 className="font-semibold text-gray-800">Bill To:</h2>
                  <p className="text-gray-700">Full Name: {data.fullName}</p>
                  <p className="text-gray-700">Email: {data.email}</p>
               </div>
               <div>
                  <h2 className="font-semibold text-gray-800">Bus Details:</h2>
                  <p className="text-gray-700">Bus Title: {data.busTitle}</p>
                  <p className="text-gray-700">Bus Number: {data.bus_number}</p>
                  <p className="text-gray-700">Departure Date: {data.date}</p>
               </div>
               <div>
                  <h2 className="font-semibold text-gray-800">Payment Method: {data.paymentMethod}</h2>
               </div>
            </div>

            <table className="w-full table-auto mb-8">
               <thead>
                  <tr>
                     <th className="text-left py-2 px-4 bg-gray-100">From</th>
                     <th className="text-left py-2 px-4 bg-gray-100">To</th>
                     <th className="text-right py-2 px-4 bg-gray-100">Passenger</th>
                     <th className="text-right py-2 px-4 bg-gray-100">Total</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td className="border-t py-2 px-4">{data.from}</td>
                     <td className="border-t py-2 px-4">{data.to}</td>
                     <td className="border-t py-2 px-4 text-right">{data.passenger}</td>
                     <td className="border-t py-2 px-4 text-right">Rs. {data.totalPrice}</td>
                  </tr>
               </tbody>
            </table>

            <div className="flex justify-end mb-8">
               <div className="w-2/3 text-right">
                  <p className="text-2xl font-bold text-gray-800">
                     Total
                     <span className="text-sm mr-2 ml-2">(Including 13% VAT)</span>: Rs. {data.totalPrice}
                  </p>
               </div>
            </div>

            <div className="text-center text-sm text-gray-500">
               <p>Thank you for travelling with us!</p>
            </div>
         </div>
      </>
   );
};

export default Invoice;
