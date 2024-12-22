/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { NextResponse } from "next/server";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ToastProvider from "../components/ToastProvider";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("username");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Error - Something  went wrong");
      toast.error("Error");
      return NextResponse.json({ error: error }, { status: 400 });
    }
  };
  //! Using useEffect hook to do something like this
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/loggedUser");
    console.log(response.data);
    setData(response.data.user.username);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <ToastProvider />
      <h1 className="text-center text-3xl sm:text-6xl font-bold bg-slate-600 text-white my-4 py-4 px-20 rounded-3xl ">
        Your Profile Page
      </h1>
      {""}
      <h2 className="px-8 py-3 font-semibold my-3 rounded-3xl bg-violet-100 text-red-500 ">
        Click here to visit your profile page {""}
        {data === "username" ? (
          ""
        ) : (
          <Link
            className="px-8 py-3 font-semibold my-3 rounded-3xl text-white bg-green-400"
            href={`/profile/${data}`}
          >
            {data}
          </Link>
        )}
      </h2>

      <button
        onClick={logout}
        className="px-8 py-3 font-semibold my-3 rounded-3xl bg-red-400 text-black hover:scale-110 hover:bg-red-600 hover:text-white border-red-900 shadow-inner shadow-black"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="px-8 py-3 font-semibold my-3 rounded-3xl bg-green-400 text-black hover:scale-110 hover:bg-green-600 hover:text-white border-green-900 shadow-inner shadow-black"
      >
        Get Your Name
      </button>
    </div>
  );
}
