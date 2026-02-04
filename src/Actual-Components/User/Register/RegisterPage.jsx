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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Import the thunk for dispatching the function
import { registerUser } from "@/redux/thunks/auth/registerAuthThunk";

import { floatingIcons } from "../helpers/floatingIcons";

export default function RegisterComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, success, loading, initialized, error } = useSelector(
    (state) => state.authSlice,
  );

  const [showPassword, setShowPassword] = useState(false);

  // const { user, success } = useSelector((state) => {
  //   return state.authSlice;
  // });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if (initialized && user) {
      router.replace("/");
    }
  }, [initialized, user, router]);

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
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter Your Name"
                onChange={HandleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                name="email"
                placeholder="Enter Your Mail"
                onChange={HandleChange}
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
                  // name="password"
                  type="button"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  Forgot?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                  onChange={HandleChange}
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
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
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
