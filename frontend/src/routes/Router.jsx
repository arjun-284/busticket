import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Login from "../components/Login.jsx";
import AdminLayout from "../components/admin/layout/AdminLayout.jsx";
import AdminDashboard from "../components/admin/Dashboard.jsx";
import UserLayout from "../components/user/layout/UserLayout.jsx";
import UserDashboard from "../components/user/Dashboard.jsx";
import BusSection from "../components/admin/Bus.jsx";
import AuthRedirect from "../components/middleware/AuthRedirect.jsx";
import ProtectedRoute from "../components/middleware/ProtectedRoute.jsx";
import Booking from "../components/Booking.jsx";
import Invoice from "../components/Invoice.jsx";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route element={<AuthRedirect />}>
                <Route path="/account" element={<Login />} />
            </Route>

            <Route path="booking" element={<Booking />} />
            <Route path="invoice" element={<Invoice />}/>

            {/* Admin Routes Grouped Under /admin */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="bus" element={<BusSection />} />
                </Route>
            </Route>


            {/* User Routes Grouped Under /user */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/user" element={<UserLayout />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Routers;