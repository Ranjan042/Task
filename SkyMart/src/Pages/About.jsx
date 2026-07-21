import React from 'react'
import { Zap, Package, Users, Star, Truck, ShieldCheck, Zap as ZapIcon, Heart, Award, ArrowRight } from 'lucide-react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router'

const STATS = [
  { icon: Package, value: '20K+', label: 'Products' },
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: Star, value: '4.9', label: 'Avg. Rating' },
  { icon: Truck, value: '99%', label: 'On-time Delivery' },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    desc: 'Every product is verified for quality and authenticity before listing.',
  },
  {
    icon: ZapIcon,
    title: 'Speed',
    desc: 'We obsess over delivery times so your orders arrive when promised.',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: 'Built around real customer feedback, not just business metrics.',
  },
  {
    icon: Award,
    title: 'Quality',
    desc: 'We curate the best — no filler, no junk, just great products.',
  },
]


const TEAM = [
  { initial: 'A', name: 'Aryan Shah',    role: 'Founder & CEO',    color: '#c8f537', textColor: '#000' },
  { initial: 'P', name: 'Priya Mehta',   role: 'Head of Product',  color: '#3b82f6', textColor: '#fff' },
  { initial: 'R', name: 'Rohan Verma',   role: 'Lead Engineer',    color: '#a855f7', textColor: '#fff' },
  { initial: 'S', name: 'Sneha Kapoor',  role: 'Design Director',  color: '#ef4444', textColor: '#fff' },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">
      <NavBar cartCount={2} />

      <div className="flex-1 max-w-[860px] mx-auto w-full px-6 py-16 flex flex-col gap-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#c8f537] flex items-center justify-center shadow-[0_0_24px_rgba(200,245,55,0.35)]">
            <Zap className="w-7 h-7 text-black fill-black" />
          </div>

          <h1 className="font-syne text-white text-5xl font-bold leading-tight">
            About <span className="text-[#c8f537]">SkyMart</span>
          </h1>

          <p className="font-dmsans text-[#888] text-base max-w-[520px] leading-relaxed">
            SkyMart is a next-generation e-commerce platform built to make online
            shopping fast, fair, and enjoyable — for everyone.
          </p>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col items-center gap-2 hover:border-[#c8f537]/30 transition-colors"
            >
              <Icon className="w-5 h-5 text-[#c8f537]" />
              <span className="font-syne text-white text-2xl font-bold">{value}</span>
              <span className="font-dmsans text-[#666] text-xs text-center">{label}</span>
            </div>
          ))}
        </div>

 
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col gap-4">
          <h2 className="font-syne text-white text-2xl font-bold">Our Story</h2>
          <div className="flex flex-col gap-4 font-dmsans text-[#888] text-sm leading-relaxed">
            <p>
              SkyMart started in 2022 as a small side project — two engineers tired of bloated,
              slow e-commerce experiences. We asked ourselves: what if shopping online was actually{' '}
              <em className="text-white not-italic font-medium">enjoyable</em>?
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across the country. We stock
              electronics, fashion, jewelry, and everyday essentials — all at prices that don't
              require a second mortgage.
            </p>
            <p>
              We're still the same team at heart: obsessed with speed, transparency, and making you
              feel good about every purchase you make here.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-syne text-white text-2xl font-bold text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-4 hover:border-[#c8f537]/30 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#c8f537]/10 border border-[#c8f537]/20 flex items-center justify-center shrink-0 group-hover:bg-[#c8f537]/20 transition-colors">
                  <Icon className="w-4 h-4 text-[#c8f537]" />
                </div>
                <div>
                  <h3 className="font-syne text-white text-sm font-bold mb-1">{title}</h3>
                  <p className="font-dmsans text-[#666] text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="flex flex-col gap-6">
          <h2 className="font-syne text-white text-2xl font-bold text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEAM.map(({ initial, name, role, color, textColor }) => (
              <div
                key={name}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#c8f537]/30 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-syne"
                  style={{ backgroundColor: color, color: textColor }}
                >
                  {initial}
                </div>
                <div className="text-center">
                  <p className="font-syne text-white text-sm font-semibold">{name}</p>
                  <p className="font-dmsans text-[#555] text-xs mt-0.5">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
          <h2 className="font-syne text-white text-2xl font-bold">Ready to shop?</h2>
          <p className="font-dmsans text-[#666] text-sm">
            Explore thousands of products at unbeatable prices.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 bg-[#c8f537] hover:bg-[#d4ff3d] active:scale-95 text-black font-syne font-bold text-sm px-7 py-3 rounded-full transition-all duration-200 mt-2"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <footer className="border-t border-[#1e1e1e] py-6 text-center">
        <p className="font-syne text-[#c8f537] text-base font-semibold tracking-tight">SkyMart</p>
        <p className="font-dmsans text-[#444] text-xs mt-1">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </footer>
    </div>
  )
}

export default About