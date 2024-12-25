"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ToastProvider from "../components/ToastProvider";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Utility function to validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      isValidEmail(user.email)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response);
      toast.success("User logged in successfully");
      router.push("/profile");
    } catch (error) {
      console.error("Login Error", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastProvider />
      <div className="w-full max-w-md bg-slate-700 shadow-white  shadow-sm rounded-lg p-6 mx-2 md:p-8 ">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-100"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring focus:ring-blue-300 ${
              user.email && !isValidEmail(user.email)
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          {user.email && !isValidEmail(user.email) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-100"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <button
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          {loading
            ? "Logging In..."
            : buttonDisabled
            ? "Complete the Form"
            : "Log In"}
        </button>
        <div className="mt-4 text-center">
          <Link href="/signup" className="text-blue-500 hover:underline">
            Do not have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
