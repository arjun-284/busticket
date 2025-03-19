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
import UserSection from "../components/admin/User.jsx";
import SettingSection from "../components/admin/Setting.jsx";
import UserSetting from "../components/user/Setting.jsx";
import AccountSection from "../components/admin/Account.jsx";
import AuthRedirect from "../components/middleware/AuthRedirect.jsx";
import ProtectedRoute from "../components/middleware/ProtectedRoute.jsx";
import Booking from "../components/Booking.jsx";
import Invoice from "../components/Invoice.jsx";
import UserTable from "../components/admin/UserTable.jsx";
import BusTable from "../components/admin/BusTable.jsx";
import Order from "../components/user/Order.jsx";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route element={<AuthRedirect />}>
                <Route path="/account" element={<Login />} />
            </Route>

            <Route path="booking" element={<Booking />} />
            <Route path="invoice" element={<Invoice />} />

            
            {/* Admin Routes Grouped Under /admin */}

            <Route element={<ProtectedRoute allowedRoles={['admin', 'manager', 'staff']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="view/buses" element={<BusTable />} />
                    <Route path="setting" element={<SettingSection />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="add/bus" element={<BusSection />} />
                    <Route path="view/users" element={<UserTable />} />
                    <Route path="account" element={<AccountSection />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={'admin'} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="add/user" element={<UserSection />} />
                </Route>
            </Route>


            {/* User Routes Grouped Under /user */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/user" element={<UserLayout />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="order" element={<Order />} />
                    <Route path="setting" element={<UserSetting />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Routers;