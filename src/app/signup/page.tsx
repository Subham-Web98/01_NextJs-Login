/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ToastProvider from "../components/ToastProvider";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  //* Validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //* Check password strength
  const isStrongPassword = (password: string) => {
    return password.length >= 6;
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0 &&
      isValidEmail(user.email) &&
      isStrongPassword(user.password)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up Success", response.data);
      toast.success("Sign Up Successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("SignUp Failed", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastProvider />
      <div className="w-full max-w-md bg-slate-700 shadow-white mx-2  shadow-sm rounded-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-white"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300"
            placeholder="Enter your username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring ${
              user.email && !isValidEmail(user.email)
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
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
            className="block text-sm font-semibold text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring ${
              user.password && !isStrongPassword(user.password)
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          {user.password && !isStrongPassword(user.password) && (
            <p className="text-red-500 text-xs mt-1">
              Password must be at least 6 characters.
            </p>
          )}
        </div>
        <button
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={onSignUp}
          disabled={buttonDisabled}
        >
          {loading
            ? "Signing Up..."
            : buttonDisabled
            ? "Complete the Form"
            : "Sign Up"}
        </button>
        <div className="mt-4 text-center bg-slate-100 rounded-md">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
