import React, { useState, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router'
import {
  Zap,
  ShoppingCart,
  LogOut,
  Star,
  TrendingUp,
  Tag,
  Package,
  Bolt,
  Shield,
  ArrowRight,
} from 'lucide-react'
import NavBar from '../components/NavBar'
import { CartContext } from '../context/CartContext'
import {PRODUCTS} from "../Pages/Shop"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: 'Electronics', icon: '💻', count: PRODUCTS.filter((product) => product.category === 'Electronics').length },
  { id: 2, name: 'Clothing', icon: '👕', count: PRODUCTS.filter((product)=>product.category==="Clothing").length },
  { id: 3, name: 'Furniture', icon: '📦', count: PRODUCTS.filter((product)=>product.category==="Furniture").length  },
  { id: 4, name: 'Home', icon: '📦', count: PRODUCTS.filter((product)=>product.category==="Home").length   },
  { id: 5, name: 'Sports', icon: '📦', count: PRODUCTS.filter((product)=>product.category==="Sports").length },
  { id: 6, name: 'Accessories', icon: '📦', count: PRODUCTS.filter((product)=>product.category==="Accessories").length  },
]

function findTopRated(){
  const list=[...PRODUCTS]
  return list.sort((a, b) => b.rating - a.rating).slice(0, 5)
}

function findNewArrivals(){
  const list=[...PRODUCTS]
  return list.sort((a, b) => b.id - a.id).slice(0, 5)
}

const TOP_RATED=findTopRated();

const NEW_ARRIVALS = findNewArrivals();

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'GOOD MORNING ☀️'
  if (hour < 17) return 'GOOD AFTERNOON 🌤️'
  return 'GOOD EVENING 🌙'
}

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Single product row inside Top Rated / New Arrivals panels */
const ProductRow = ({ product, addToCart, openCart }) => (
  
  <div className="flex items-center gap-3 py-3 border-b border-[#2a2a2a] last:border-b-0 group">
    <img
      src={product.image}
      alt="product"
      className="w-11 h-11 rounded-xl object-cover shrink-0 bg-[#262626]"
      onError={(e) => {
        e.target.style.display = 'none'
      }}
    />
    <span className="font-dmsans text-[#c8f537] text-sm font-bold flex-1">{product.price}</span>
    <button className="w-8 h-8 rounded-xl border border-[#2a2a2a] flex items-center justify-center hover:border-[#c8f537]/60 hover:bg-[#c8f537]/10 transition-all">
      <ShoppingCart onClick={() => {openCart();  addToCart(product)}}  className="w-3.5 h-3.5 text-[#c8f537]" />
    </button>
  </div>
)

/** Two-column product panel (Top Rated / New Arrivals) */
const ProductPanel = ({ title, icon, products, accent, addToCart, openCart }) => {
const navigate = useNavigate();
  return(
  <div className="bg-white rounded-2xl p-5 flex-1 min-w-0">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <h3 className="font-syne text-[#111111] font-bold text-base">{title}</h3>
      </div>
      <button onClick={() => navigate('/shop', { state: { sort:title==='Top Rated'?'Top Rated':'Featured'  } })}  className="font-dmsans text-[#c8f537] text-xs font-semibold hover:underline flex items-center gap-0.5">
        See all <ArrowRight className="w-3 h-3" />
      </button>
    </div>
    <div>
      {products.map((p) => (
        <ProductRow key={p.id} product={p} addToCart={addToCart} openCart={openCart}/>
      ))}
    </div>
  </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate()
  // const [user, setUser] = useState(null)
  const {cart,user,addToCart,openCart} = useContext(CartContext);


  useEffect(() => {
   
    if (!user) {
      navigate('/login')
      return
    }

  }, [navigate])

  const firstName = user?.name?.split(' ')[0] || 'User'
  
  const cartValue=cart.reduce((sum,item)=>{
    return sum+(item.price||0)*(item.qty||1)
  },0)

  const STATS = [
    {
      icon: <Package className="w-4 h-4 text-[#c8f537]" />,
      bg: 'bg-[#c8f537]/10',
      value: cart.length || 2,
      label: 'Cart Items',
      sub: 'In your bag',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
      bg: 'bg-blue-400/10',
      value: `$${cartValue > 0 ? cartValue.toFixed(2) : '599.98'}`,
      label: 'Cart Value',
      sub: 'Ready to checkout',
    },
    {
      icon: <Star className="w-4 h-4 text-yellow-400" />,
      bg: 'bg-yellow-400/10',
      value: 5,
      label: 'Top Products',
      sub: 'Highly rated',
      subColor: 'text-[#c8f537]',
    },
    {
      icon: <Tag className="w-4 h-4 text-purple-400" />,
      bg: 'bg-purple-400/10',
      value: 6,
      label: 'Categories',
      sub: 'To explore',
    },
  ]

  return (
    <div className="min-h-screen bg-[#111111] font-dmsans">
      {/* ── NavBar ── */}
      <NavBar  />

      {/* ── Page Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">

        {/* ── Hero Banner ── */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-8 flex items-start justify-between gap-6">
          {/* Left text */}
          <div className="flex flex-col gap-4 max-w-md">
            <p className="font-dmsans text-[#c8f537] text-xs font-bold tracking-[0.15em] uppercase">
              {getGreeting()}
            </p>
            <div>
              <h1 className="font-syne text-white text-4xl font-bold leading-tight">
                Welcome back,
              </h1>
              <h1 className="font-syne text-[#c8f537] text-4xl font-bold leading-tight">
                {firstName}!
              </h1>
            </div>
            <p className="font-dmsans text-[#6b6b6b] text-sm leading-relaxed">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={() => navigate('/shop')}
                className="font-syne flex items-center gap-2 bg-[#c8f537] hover:bg-[#d4f94d] active:scale-[0.98] transition-all rounded-2xl px-5 py-2.5 text-black text-sm font-bold"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="font-dmsans flex items-center gap-2 border border-[#2a2a2a] hover:border-white/30 rounded-2xl px-5 py-2.5 text-white text-sm transition-all"
              >
                View All Products
              </button>
            </div>
          </div>

          {/* Right stat cards */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="bg-[#2a2a00] border border-[#c8f537]/20 rounded-2xl px-6 py-4 text-center min-w-[130px]">
              <p className="font-syne text-[#c8f537] text-3xl font-bold">20+</p>
              <p className="font-dmsans text-[#6b6b6b] text-xs mt-0.5">Products Available</p>
            </div>
            <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl px-6 py-4 text-center">
              <p className="font-syne text-white text-3xl font-bold">Free</p>
              <p className="font-dmsans text-[#6b6b6b] text-xs mt-0.5">Delivery on ₹999+</p>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-[#3a3a3a] transition-colors"
            >
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="font-syne text-white text-lg font-bold leading-tight">{s.value}</p>
                <p className="font-dmsans text-[#6b6b6b] text-xs">{s.label}</p>
                {s.sub && (
                  <p className={`font-dmsans text-xs mt-0.5 ${s.subColor || 'text-[#555]'}`}>
                    {s.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Shop by Category ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-syne text-white text-xl font-bold">Shop by Category</h2>
            <button className="font-dmsans text-[#c8f537] text-sm font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('/shop', { state: { category: cat.name } })}
                className="bg-white hover:bg-[#f5f5f5] rounded-2xl px-4 py-6 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-3xl">{cat.icon}</span>
                <p className="font-dmsans text-[#111111] text-sm font-semibold">{cat.name}</p>
                <p className="font-dmsans text-[#888] text-xs">{cat.count} items</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Top Rated + New Arrivals ── */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <ProductPanel
            title="Top Rated"
            icon="⭐"
            products={TOP_RATED}
            addToCart={addToCart}
            openCart={openCart}
          />
          <ProductPanel
            title="New Arrivals"
            icon="⚡"
            products={NEW_ARRIVALS}
            addToCart={addToCart}
            openCart={openCart}
          />
        </div>

        {/* ── Feature Highlights ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Zap className="w-5 h-5 text-[#c8f537]" />,
              bg: 'bg-[#c8f537]/10',
              title: 'Fast Delivery',
              sub: 'Same day on select items',
            },
            {
              icon: <Shield className="w-5 h-5 text-[#c8f537]" />,
              bg: 'bg-[#c8f537]/10',
              title: 'Secure Payments',
              sub: '100% encrypted checkout',
            },
            {
              icon: <Tag className="w-5 h-5 text-[#c8f537]" />,
              bg: 'bg-[#c8f537]/10',
              title: 'Best Prices',
              sub: 'Price match guarantee',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-[#3a3a3a] transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                {f.icon}
              </div>
              <div>
                <p className="font-dmsans text-white text-sm font-semibold">{f.title}</p>
                <p className="font-dmsans text-[#6b6b6b] text-xs mt-0.5">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#2a2a2a] mt-6 py-6 text-center">
        <p className="font-syne text-[#c8f537] font-bold text-base mb-1">SkyMart</p>
        <p className="font-dmsans text-[#555] text-xs">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </footer>
    </div>
  )
}

export default Home