import React, { use, useState, useEffect } from 'react'
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const {setuser,RenderNotificationUi} = useContext(CartContext)
  
  const { register, handleSubmit, getValues, formState: { errors }, reset, setError } = useForm();
  const navigate = useNavigate();

  const [RegisteredUsers, setRegisteredUsers] = useState(GetUsers());


  function GetUsers() {
    return JSON.parse(localStorage.getItem("users_sm")) || [];
  }

  const HandleSubmit = (data) => {

    const user = RegisteredUsers.find((user) => user.email === data.email);
    if (user) {
      if (user.password === data.password) {
        localStorage.setItem("Loguser_sm", JSON.stringify(user));
        setuser(user);
        navigate("/");
        RenderNotificationUi("Login Successful")
      } else {
        setError("password", {
          type: "manual",
          message: "Incorrect Password",
        });
        RenderNotificationUi("Incorrect Password")
      }
    } else {
      setError("email", {
        type: "manual",
        message: "User not found",
      });
      RenderNotificationUi("User not found")
    }

  
  }
  return (
    // DM Sans as the base for all UI / body text
    <div className="min-h-screen w-full flex bg-[#111111] font-dmsans ">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 px-16 py-12 border-r-2 border-[#2a2a2a]">

        {/* Logo — Syne for the brand name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#c8f537] flex items-center justify-center">
            <Zap className="w-5 h-5 text-black fill-black" />
          </div>
          <span className="font-syne text-white text-xl font-bold tracking-tight">Sky<span className='text-[#c8f537]'>Mart</span></span>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col gap-6">
          <div>
            {/* "WELCOME BACK" label — DM Sans, small caps feel */}
            <p className="font-dmsans text-[#c8f537] text-xs font-bold tracking-[0.15em] uppercase mb-5">
              Welcome Back
            </p>

            {/* Big headline — Syne, extrabold display */}
            <h1 className="font-syne font-bold text-5xl leading-16  text-white text-5xl  mb-2">
              Shop the future.
            </h1>
            <h1 className="font-syne text-[#c8f537] text-5xl font-bold leading-tight">
              Today.
            </h1>
          </div>

          {/* Description — DM Sans body */}
          <p className="font-dmsans text-[#6b6b6b] text-sm leading-relaxed max-w-xs">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-6">
            {[
              { value: '20K+', label: 'Products' },
              { value: '50K+', label: 'Users' },
              { value: '4.9★', label: 'Rating', accent: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 border border-[#2a2a2a] rounded-2xl px-5 py-4"
              >
                {/* Stat number — Syne bold */}
                <p className={`font-syne text-lg font-bold ${stat.accent ? 'text-[#c8f537]' : 'text-white'}`}>
                  {stat.value}
                </p>
                {/* Stat label — DM Sans */}
                <p className="font-dmsans text-[#6b6b6b] text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-[#111111]">

        {/* Card */}
        <div className="w-full max-w-md bg-[#1c1c1c] rounded-3xl p-8 shadow-2xl">

          {/* Card Header */}
          <div className="mb-7">
            {/* "Sign in" — Syne display heading */}
            <h2 className="font-syne text-white text-2xl font-bold mb-1">Sign in</h2>
            {/* Subtitle — DM Sans */}
            <p className="font-dmsans text-[#6b6b6b] text-sm">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(HandleSubmit)} className="flex flex-col gap-3">

            {/* Email */}
            <div className="flex items-center gap-3 bg-[#262626] rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#c8f537]/40 transition-colors">
              <Mail className="w-4 h-4 text-[#6b6b6b] shrink-0" />
              <input
                {...register("email", { required: true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
                type="email"
                placeholder="Email address"
                className="font-dmsans bg-transparent flex-1 text-sm text-white placeholder-[#6b6b6b] outline-none"
              />
            </div>

            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

            {/* Password */}
            <div className="flex items-center gap-3 bg-[#262626] rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#c8f537]/40 transition-colors">
              <Lock className="w-4 h-4 text-[#6b6b6b] shrink-0" />
              <input
                {...register("password", { required: true})}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="font-dmsans bg-transparent flex-1 text-sm text-white placeholder-[#6b6b6b] outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-[#6b6b6b] hover:text-white transition-colors"
                >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            {/* Submit — DM Sans medium for button label */}
            <button
              type="submit"
              className="font-syne mt-1 w-full flex items-center justify-center gap-2 bg-[#c8f537] hover:bg-[#d4f94d] active:scale-[0.98] transition-all rounded-2xl py-3.5 text-black text-sm font-bold tracking-wide"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer — DM Sans */}
          <p className="font-dmsans text-center text-[#6b6b6b] text-xs mt-6">
            Don't have an account?{' '}
            <a href="#" className="font-dmsans text-[#c8f537] font-semibold hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login