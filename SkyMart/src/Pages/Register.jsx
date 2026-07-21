import React, { useEffect, useState } from 'react'
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'



const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [RegisteredUsers, setRegisteredUsers] = useState(GetUsers());

  const { register, handleSubmit, getValues, formState: { errors }, reset, setError } = useForm();

  useEffect(() => {
    console.log("Register in Mount");
    console.log(RegisteredUsers);

    return () => {
      console.log("Register in UnMount");
    }
    
  }, [])
  console.log("Register in rerendering");

  function SavaUsers(users) {
    localStorage.setItem("users_sm", JSON.stringify(users || []));
  }

  function GetUsers() {
    return JSON.parse(localStorage.getItem("users_sm")) || [];
  }

  const HandleSubmit = (data) => {

    let NewUser = { ...data, id: Date.now(), avtarName: data.name.charAt(0) };

    const isUserExists = RegisteredUsers.find((user) => user.email === data.email);
    if (isUserExists) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

  const updatedUsers = [...RegisteredUsers, NewUser];
  setRegisteredUsers(updatedUsers);
    SavaUsers(updatedUsers);
    reset();
    navigate("/login");
  }
  return (



    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0e0e0e] font-dmsans px-4">

      {/* ── Logo (top center) ── */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-[#c8f537] flex items-center justify-center">
          <Zap className="w-4.5 h-4.5 text-black fill-black" />
        </div>
        <span className="font-syne text-white text-xl font-bold tracking-tight">
          Sky<span className="text-[#c8f537]">Mart</span>
        </span>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-3xl p-8 shadow-2xl">

        {/* Card Header */}
        <div className="mb-6">
          <h1 className="font-syne text-white text-2xl font-bold mb-1">Create account</h1>
          <p className="font-dmsans text-[#6b6b6b] text-sm">Join SkyMart and start shopping</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(HandleSubmit)} className="flex flex-col gap-3">

          {/* Full name */}
          <div className="flex items-center gap-3 bg-[#262626] rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#c8f537]/40 transition-colors">
            <User className="w-4 h-4 text-[#6b6b6b] shrink-0" />
            <input
              {...register("name", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Full Name must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Full Name must be at most 20 characters",
                },
              })}
              type="text"
              placeholder="Full name"
              className="font-dmsans bg-transparent flex-1 text-sm text-white placeholder-[#6b6b6b] outline-none"
            />
          </div>

          {errors.name && <p className="text-red-500 text-xs mt-1 font-syne">{errors.name.message}</p>}

          {/* Email */}
          <div className="flex items-center gap-3 bg-[#262626] rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#c8f537]/40 transition-colors">
            <Mail className="w-4 h-4 text-[#6b6b6b] shrink-0" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email is invalid",
                },
              })}
              type="email"
              placeholder="Email address"
              className="font-dmsans bg-transparent flex-1 text-sm text-white placeholder-[#6b6b6b] outline-none"
            />
          </div>

          {errors.email && <p className="text-red-500 text-xs mt-1 font-syne">{errors.email.message}</p>}
          {/* Password */}
          <div className="flex items-center gap-3 bg-[#262626] rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#c8f537]/40 transition-colors">
            <Lock className="w-4 h-4 text-[#6b6b6b] shrink-0" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters",
                },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 6 chars)"
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

          {/* Confirm Password */}
          <div className="flex items-center gap-3 bg-[#262626] rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#c8f537]/40 transition-colors">
            <Lock className="w-4 h-4 text-[#6b6b6b] shrink-0" />
            <input
              {...register('confirmPassword', { required: "Confirm Password is required", validate: (value) => value === getValues('password') || "Passwords do not match" })}
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm password"
              className="font-dmsans bg-transparent flex-1 text-sm text-white placeholder-[#6b6b6b] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="text-[#6b6b6b] hover:text-white transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {errors.confirmPassword && <span className="text-red-500 text-xs font-syne">{errors.confirmPassword.message}</span>}

          {/* Submit */}
          <button
            type="submit"
            className="font-syne mt-1 w-full flex items-center justify-center gap-2 bg-[#c8f537] hover:bg-[#d4f94d] active:scale-[0.98] transition-all rounded-2xl py-3.5 text-black text-sm font-bold tracking-wide"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <p className="font-dmsans text-center text-[#6b6b6b] text-xs mt-6">
          Already have an account?{' '}
          <NavLink to="/login" className="font-dmsans text-[#c8f537] font-semibold hover:underline">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Register