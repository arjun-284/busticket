import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const [showLoginForm, setLoginFormActive] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  // State for registration form
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Choose between login and register form
  const handleFormClassToggle = () => {
    setLoginFormActive((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Change handler for registration form
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Change handler for login form
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Submit handler for registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        // Optionally switch to the login form after a successful registration
        setLoginFormActive(true);
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Submit handler for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        // Store the token and user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Update the AuthContext
        setIsAuthenticated(true);
        setUser(data.user);
        // Redirect to the dashboard page
        if(data.user.role === "admin"){
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {/* Register Form */}
        <div className={`${showLoginForm ? "hidden" : ""}`}>
          <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                name="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="********"
                name="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="********"
                name="confirmPassword"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleRegisterChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className={`${showLoginForm ? "" : "hidden"}`}>
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                name="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="********"
                name="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleLoginChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Toggle Button */}
        <p className="text-gray-600 text-center mt-4">
          {showLoginForm ? "Don't have an account?" : "Already have an account?"}
          <button onClick={handleFormClassToggle} className="text-blue-500 hover:underline ml-2">
            {showLoginForm ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
