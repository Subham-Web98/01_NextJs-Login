/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ToastProvider from "../components/ToastProvider";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Logout Functionality
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout Error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Fetch User Details
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/loggedUser");
      console.log("User Data:", response.data);
      setData(response.data.user.username);
      toast.success("User details fetched successfully");
    } catch (error: any) {
      console.error("Error Fetching User Details:", error);
      toast.error("Failed to fetch user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 p-4">
      <ToastProvider />
      <div className="max-w-3xl w-full bg-gray-800 shadow-xl rounded-lg p-6">
        <h1 className="text-center text-4xl sm:text-6xl font-bold text-white mb-8 animate-fade-in">
          Profile Page
        </h1>

        <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-6">
          <h2
            className={`text-lg sm:text-2xl font-semibold text-center ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {loading ? (
              "Fetching your profile..."
            ) : data ? (
              <>
                Click here Visit your profile   {" > "}
                <Link
                  className="inline-block mt-2 px-4 py-1/2 font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-950  transition transform duration-300"
                  href={`/profile/${data}`}
                >
                  {data}
                </Link>
              </>
            ) : (
              "User data not available. Please fetch details."
            )}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={logout}
            className="w-full sm:w-auto px-6 py-3 font-semibold rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 text-white transition transform duration-300 shadow-lg"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition transform duration-300 shadow-lg ${
              loading
                ? "bg-gray-500 text-gray-300 cursor-not-allowed animate-pulse"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
            }`}
          >
            {loading ? "Loading..." : "Get Your Username"}
          </button>
        </div>
      </div>
    </div>
  );
}
