import React, { useContext } from 'react'
import { Zap, ShoppingCart, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { CartContext } from '../context/CartContext'

const NavBar = () => {
  const navigate = useNavigate()
  const { user, cartCount, openCart } = useContext(CartContext)

  const handleLogout = () => {
    localStorage.removeItem('Loguser_sm')
    navigate('/login')
  }

  const initials = user?.avtarName

  return (
    <nav className="w-full bg-[#111111] border-b border-[#2a2a2a] px-30 py-3 flex items-center justify-between sticky top-0 z-50">
      
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-9 h-9 rounded-full bg-[#c8f537] flex items-center justify-center">
          <Zap className="w-4 h-4 text-black fill-black" />
        </div>
        <span className="font-syne text-white text-lg font-bold tracking-tight">
          Sky<span className="text-[#c8f537]">Mart</span>
        </span>
      </div>

=
      <div className="flex items-center gap-6">
        {[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: 'About', to: '/about' },
        ].map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `font-dmsans text-sm transition-colors ${
                isActive ? 'text-[#c8f537]' : 'text-[#aaaaaa] hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

    
      <div className="flex items-center gap-3">
   
        {user && (
          <div className="flex items-center gap-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-[10px] px-3 py-1.5">
            <div className="w-6 h-6 rounded bg-[#c8f537] flex items-center justify-center">
              <span className="font-syne text-black text-[10px] font-bold">{initials}</span>
            </div>
            <span className="font-dmsans text-[#b2aeae] text-sm">{user.name}</span>
          </div>
        )}

  
        <button
          onClick={openCart}
          className="relative w-9 h-9 rounded bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center hover:border-[#c8f537]/50 transition-colors"
        >
          <ShoppingCart className="w-4 h-4 text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded bg-[#c8f537] flex items-center justify-center">
              <span className="font-syne text-black text-[9px] font-bold">{cartCount}</span>
            </span>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center hover:border-red-500/50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#aaaaaa] hover:text-red-400" />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
