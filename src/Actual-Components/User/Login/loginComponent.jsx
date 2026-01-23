"use client";
import React, { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  MessageSquare,
  Video,
  Music,
  Image,
  FileText,
  Users,
} from "lucide-react";

import { loginAuthThunk } from "@/redux/thunks/auth/loginAuthThunk";
import { useDispatch, useSelector } from "react-redux";

// REDUX SLICES IMPORTS

export default function LoginComponent() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { user, loading, error, success } = useSelector((state) => {
    return state.authSlice;
  });

  useEffect(() => {
    if (success && user) {
      console.log("HI");
      router.push("/"); // go to your protected layout
    }
  }, [success, user]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const floatingIcons = [
    {
      Icon: MessageSquare,
      color: "bg-blue-200",
      position: "top-20 left-40",
      size: "w-16 h-16",
    },
    {
      Icon: Video,
      color: "bg-purple-200",
      position: "top-32 right-48",
      size: "w-20 h-20",
    },
    {
      Icon: Music,
      color: "bg-pink-200",
      position: "top-16 right-80",
      size: "w-14 h-14",
    },
    {
      Icon: Image,
      color: "bg-green-200",
      position: "top-48 left-64",
      size: "w-12 h-12",
    },
    {
      Icon: FileText,
      color: "bg-purple-300",
      position: "top-64 right-96",
      size: "w-16 h-16",
    },
    {
      Icon: Users,
      color: "bg-green-300",
      position: "bottom-48 left-48",
      size: "w-14 h-14",
    },
    {
      Icon: Mail,
      color: "bg-blue-300",
      position: "bottom-32 right-64",
      size: "w-12 h-12",
    },
    {
      Icon: Lock,
      color: "bg-pink-300",
      position: "bottom-64 left-96",
      size: "w-16 h-16",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("THE CREDENTIALS YOUHAVE SENT", form);
    dispatch(loginAuthThunk(form));
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center bg-transparent">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} ${item.size} ${item.color} rounded-2xl flex items-center justify-center shadow-xl`}
          >
            <item.Icon className="w-1/2 h-1/2 text-white" />
          </div>
        ))}
      </div>

      {/* Login Card  */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="absolute -inset-8 rounded-3xl bg-white/60 blur-3xl" />

        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-xl p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            PLANNER
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter Your Mail"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  Forgot?
                </button>
              </div>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-500 text-sm">or</span>
            </div>
          </div>

          {/* Google */}
          <button className="w-full border-2 border-gray-200 py-3.5 rounded-xl flex justify-center gap-3 hover:shadow-md">
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don&apos;t have an account?{" "}
            <span className="text-indigo-600 font-medium cursor-pointer">
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
