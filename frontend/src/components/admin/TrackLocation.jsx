import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TrackLocation = () => {
   const [location, setLocation] = useState({ lat: null, lng: null });
   const [error, setError] = useState(null);
   const [userAddress, setUserAddress] = useState("");

   useEffect(() => {
      if (!navigator.geolocation) {
         setError("Geolocation is not supported by your browser.");
         return;
      }

      // Start watching the user's position with high accuracy
      const watchId = navigator.geolocation.watchPosition(
         (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
         },
         (err) => {
            setError(`Error fetching location: ${err.message}`);
         },
         {
            enableHighAccuracy: true,   // Use GPS if available
            timeout: 10000,             // Wait max 10s
            maximumAge: 0               // Always get fresh data
         }
      );

      // Cleanup on unmount to stop watching
      return () => {
         navigator.geolocation.clearWatch(watchId);
      };
   }, []);

   useEffect(() => {
      if (location.lat && location.lng) {
         const getUserAddress = async () => {
            try {
               const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`;
               const response = await fetch(url);
               const data = await response.json();
               setUserAddress(data.display_name || "Address not found");
            } catch (error) {
               console.error("Error fetching address:", error);
               setUserAddress("Error fetching address");
            }
         };
         getUserAddress();
      }
   }, [location.lat, location.lng]);

   return (
      <div className="flex-1 p-6 bg-gray-100">
         <h1 className="text-2xl font-bold mb-4">Track Your Location</h1>

         {error ? (
            <p className="text-red-500">{error}</p>
         ) : location.lat && location.lng ? (
            <>
               <MapContainer
                  center={[location.lat, location.lng]}
                  zoom={16}
                  style={{ height: "400px", width: "100%" }}
               >
                  <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[location.lat, location.lng]}>
                     <Popup>You are here: {userAddress}</Popup>
                  </Marker>
               </MapContainer>

               <p className="mt-4 font-medium">
                  <strong>Latitude:</strong> {location.lat} <br />
                  <strong>Longitude:</strong> {location.lng}
               </p>
            </>
         ) : (
            <p>Fetching location...</p>
         )}
      </div>
   );
};

export default TrackLocation;
