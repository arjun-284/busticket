import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Helper to generate dynamic seat map
const generateSeatMap = (maxSeats = 44) => {
  const rows = [];
  let seat = 1;
  while (seat <= maxSeats) {
    let thisRow = [];
    for (let col = 0; col < 4 && seat <= maxSeats; col++) {
      thisRow.push(seat);
      seat++;
    }
    while (thisRow.length < 4) thisRow.push(null);
    rows.push(thisRow);
  }
  return rows;
};

// Side label (A/B)
const seatSide = (rowIdx, colIdx) => (colIdx < 2 ? "A" : "B");

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bus = state?.bus || {};
  const formData = state?.formData || {};

  // Simulated user (for demo; get from localStorage in prod)
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user")) || null;
  } catch {}

  // Bus seat map (dynamic)
  const maxSeat = Number(bus.passenger || 44);
  const seatMap = generateSeatMap(maxSeat);

  // Fetched from backend: all booked seats for this bus
  // For demo, use static array. Replace with API result.
  const [bookedSeats, setBookedSeats] = useState([7, 28, 32, 31, 44, 3]);
  // User's current selection
  const [selectedSeats, setSelectedSeats] = useState([]);

  // After booking, these seats will be added to bookedSeats
  const [justBooked, setJustBooked] = useState([]);

  // Passenger count
  const passengerCount = parseInt(formData.passenger || 1);

  // Form state
  const [bookingData, setBookingData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    passenger: passengerCount,
    selectedSeatNos: [],
    totalPrice: (parseFloat(bus.price || 0) * passengerCount * 1.13).toFixed(2),
    paymentMethod: "",
    busId: bus._id || "",
    busTitle: bus.title || "",
    date: formData.date || "",
    from: bus.from?.name || "",
    to: bus.to?.name || "",
    bus_number: bus.bus_number || "",
    totalSeat: bus.passenger || "",
    guest: user ? 0 : 1,
    userId: user?.id || null,
  });

  // Update price & seat numbers when selected
  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      selectedSeatNos: selectedSeats.map((num) => {
        for (let row = 0; row < seatMap.length; row++) {
          for (let col = 0; col < seatMap[row].length; col++) {
            if (seatMap[row][col] === num) {
              return `${num}${seatSide(row, col)}`;
            }
          }
        }
        return num;
      }),
      passenger: selectedSeats.length,
      totalPrice: (
        parseFloat(bus.price || 0) * selectedSeats.length * 1.13
      ).toFixed(2),
    }));
  }, [selectedSeats, bus.price]);

  // Handle form change
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle seat click
  const handleSeatClick = (num) => {
    if (
      bookedSeats.includes(num) ||
      justBooked.includes(num) ||
      (selectedSeats.includes(num) && selectedSeats.length <= 1)
    ) {
      return;
    }
    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== num));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, num]);
    }
  };

  // Validate before submit
  const validateForm = (data) => {
    const err = {};
    if (!data.fullName) err.fullName = "Full Name is required";
    if (!data.email) err.email = "Email is required";
    if (!data.selectedSeatNos || data.selectedSeatNos.length !== passengerCount)
      err.selectedSeatNos = "Select all seats as per number of passengers";
    if (!data.paymentMethod) err.paymentMethod = "Payment method is required";
    if (!data.date) err.date = "Departure date is required";
    return err;
  };

  // Submit booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(bookingData);
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join("\n"));
      return;
    }
    try {
      // Replace with real POST in production
      // const response = await fetch("http://localhost:5000/api/booking", {...});
      // const data = await response.json();
      // if (response.ok) { ... }
      // SIMULATE booking success:
      setJustBooked([...selectedSeats]);
      setBookedSeats((prev) => [...prev, ...selectedSeats]);
      setSelectedSeats([]);
      setTimeout(() => {
        // Redirect to invoice after 1s
        navigate(`/invoice`, {
          state: {
            invoiceData: {
              newBooking: {
                ...bookingData,
                selectedSeatNos: bookingData.selectedSeatNos,
                passenger: bookingData.selectedSeatNos.length,
              },
              message: "Booking Success",
            },
          },
        });
      }, 800);
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  // Renders a seat with proper color/status
  const renderSeat = (num, rowIdx, colIdx) => {
    if (!num) return <div className="w-8 h-8" key={`empty-${rowIdx}-${colIdx}`}></div>;
    let status = "available";
    if (bookedSeats.includes(num) || justBooked.includes(num)) status = "booked";
    else if (selectedSeats.includes(num)) status = "selected";
    const color =
      status === "booked"
        ? "bg-red-500"
        : status === "selected"
        ? "bg-blue-500"
        : "bg-green-500 hover:bg-green-400 cursor-pointer";

    return (
      <button
        key={num}
        className={`w-10 h-10 rounded-md shadow flex items-center justify-center font-semibold text-white m-1 ${color} transition`}
        disabled={status === "booked"}
        onClick={() => handleSeatClick(num)}
        style={{
          border: status === "selected" ? "2px solid #222" : undefined,
          opacity: status === "booked" ? 0.5 : 1,
        }}
      >
        {num}
        <span style={{ fontSize: 10, marginLeft: 2 }}>{seatSide(rowIdx, colIdx)}</span>
      </button>
    );
  };

  // Seat legend
  const legend = [
    { color: "bg-green-500", label: "Available" },
    { color: "bg-blue-500", label: "Your Selected" },
    { color: "bg-red-500", label: "Booked" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Book Your Seats</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Seat layout */}
        <div className="bg-white rounded-xl p-6 shadow-xl w-fit">
          <div className="mb-2 flex gap-2">
            {legend.map((l, i) => (
              <span key={i} className="flex items-center mr-4 text-sm">
                <span className={`inline-block w-4 h-4 rounded ${l.color} mr-1`} />
                {l.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {seatMap.map((row, rIdx) => (
              <div className="flex" key={rIdx}>
                {row.map((num, cIdx) => renderSeat(num, rIdx, cIdx))}
              </div>
            ))}
          </div>
          <div className="mt-4 font-semibold text-blue-600">
            Your Selection:{" "}
            {selectedSeats
              .map((num) => {
                for (let row = 0; row < seatMap.length; row++) {
                  for (let col = 0; col < seatMap[row].length; col++) {
                    if (seatMap[row][col] === num) {
                      return `${num}${seatSide(row, col)}`;
                    }
                  }
                }
                return num;
              })
              .join(", ") || "-"}
          </div>
        </div>

        {/* Right: Booking form */}
        <form onSubmit={handleBookingSubmit} className="flex-1 bg-white rounded-xl shadow-xl p-8">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={bookingData.fullName}
                onChange={handleBookingChange}
                className="w-full border px-3 py-2 rounded"
                required
                readOnly={!!user?.name}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleBookingChange}
                className="w-full border px-3 py-2 rounded"
                required
                readOnly={!!user?.email}
              />
            </div>
            <div>
              <label className="font-medium">No. of Passengers</label>
              <input
                type="number"
                name="passenger"
                value={bookingData.passenger}
                min="1"
                className="w-full border px-3 py-2 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="font-medium">Departure Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleBookingChange}
                className="w-full border px-3 py-2 rounded"
                required
                readOnly={!!formData.date}
              />
            </div>
            <div>
              <label className="font-medium">Payment</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="esewa"
                    checked={bookingData.paymentMethod === "esewa"}
                    onChange={handleBookingChange}
                    required
                  />{" "}
                  eSewa
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={bookingData.paymentMethod === "cash"}
                    onChange={handleBookingChange}
                  />{" "}
                  Cash
                </label>
              </div>
            </div>
            <div className="font-medium">
              <span>
                Total Price: <b>Rs. {bookingData.totalPrice}</b> (incl. 13% VAT)
              </span>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
      {/* After booking, show a message */}
      {justBooked.length > 0 && (
        <div className="mt-6 text-green-700 font-bold text-xl">
          Your booking was successful! Booked seats:{" "}
          {justBooked
            .map((num) => {
              for (let row = 0; row < seatMap.length; row++) {
                for (let col = 0; col < seatMap[row].length; col++) {
                  if (seatMap[row][col] === num) {
                    return `${num}${seatSide(row, col)}`;
                  }
                }
              }
              return num;
            })
            .join(", ")}
        </div>
      )}
    </div>
  );
};

export default Booking;
