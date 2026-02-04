"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { loginAuthThunk } from "@/redux/thunks/auth/loginAuthThunk";
import { floatingIcons } from "../helpers/floatingIcons";

export default function LoginComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error, initialized } = useSelector(
    (state) => state.authSlice,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  // Redirect on successful login
  // useEffect(() => {
  //   if (success && user) router.push("/");
  // }, [success, user, router]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!loading) dispatch(loginAuthThunk(form));
    },
    [dispatch, form, loading],
  );

  // Show loader if loading
  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
      </div>
    );
  }

  useEffect(() => {
    if (initialized && user) {
      router.replace("/");
    }
  }, [initialized, user, router]);

  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="absolute -inset-8 rounded-3xl bg-white/60 blur-3xl" />

        <div className="relative bg-white rounded-3xl shadow-xl p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            PLANNER
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <InputField
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Mail"
              disabled={loading}
            />

            {/* Password */}
            <PasswordField
              label="Password"
              name="password"
              value={form.password}
              showPassword={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              onChange={handleChange}
              disabled={loading}
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Error */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {/* Divider */}
          <Divider />

          {/* Google login */}
          <button
            className="w-full border-2 border-gray-200 py-3.5 rounded-xl flex justify-center gap-3 hover:shadow-md mt-4"
            disabled={loading}
          >
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

/* ------------------ Subcomponents ------------------ */

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required
      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
    />
  </div>
);

const PasswordField = ({
  label,
  name,
  value,
  showPassword,
  toggleShow,
  onChange,
  disabled,
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <button
        type="button"
        className="text-sm text-gray-500 hover:text-indigo-600"
      >
        Forgot?
      </button>
    </div>
    <div className="relative">
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-12 disabled:opacity-50"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);

const Divider = () => (
  <div className="relative my-8">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200" />
    </div>
    <div className="relative flex justify-center">
      <span className="px-4 bg-white text-gray-500 text-sm">or</span>
    </div>
  </div>
);
