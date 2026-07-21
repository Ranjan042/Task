import React, { useState, useContext, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import {
  Star, ShoppingCart, Check, ChevronRight, Minus, Plus,
  Truck, ShieldCheck, RotateCcw, Heart, ArrowLeft, Eye
} from 'lucide-react'
import NavBar from '../components/NavBar'
import { CartContext } from '../context/CartContext'
import { PRODUCTS } from './Shop'

// ── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating, reviews, size = 'sm' }) => {
  const wh = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`${wh} ${s <= rating
              ? 'fill-[#c8f537] text-[#c8f537]'
              : 'fill-[#2a2a2a] text-[#2a2a2a]'
              }`}
          />
        ))}
      </div>
      <span className={`font-dmsans text-[#666] ${textSize}`}>
        {rating}.0 ({reviews} reviews)
      </span>
    </div>
  )
}

const RelatedCard = ({ product }) => {
  const { cart, addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  const isAdded = cart.some((item) => item.id === product.id)

  return (
    <div
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden group hover:border-[#c8f537]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,245,55,0.07)] flex flex-col cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden bg-[#111] h-[155px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/1a1a1a/333?text=${encodeURIComponent(product.name)}`
          }}
        />
        <span className="absolute top-2.5 left-2.5 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#2a2a2a] text-[#aaa] text-[10px] font-dmsans font-medium px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      <div className="p-3.5 flex flex-col gap-2.5 flex-1">
        <div>
          <span className="text-[#555] text-[10px] font-dmsans uppercase tracking-widest">{product.category}</span>
          <h3 className="font-dmsans text-white text-sm font-medium mt-0.5 line-clamp-2 leading-snug">{product.name}</h3>
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={`w-3 h-3 ${s <= product.rating ? 'fill-[#c8f537] text-[#c8f537]' : 'fill-[#2a2a2a] text-[#2a2a2a]'}`} />
          ))}
          <span className="font-dmsans text-[#666] text-[10px] ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-0.5">
          <span className="font-syne text-white text-sm font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => { e.stopPropagation(); if (!isAdded) addToCart(product) }}
            className={`flex items-center gap-1 text-[11px] font-dmsans font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${isAdded
              ? 'bg-[#37f53a] text-black'
              : 'bg-[#c8f537] text-black hover:bg-[#d4ff3d] active:scale-95'
              }`}
          >
            {isAdded ? <><Check className="w-3 h-3" /> Added</> : <><ShoppingCart className="w-3 h-3" /> Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}

const FAKE_REVIEWS = [
  { id: 1, name: 'Alex R.', avatar: 'AR', rating: 5, date: 'June 12, 2025', text: 'Absolutely love this product! Build quality is top-notch and it works exactly as described. Shipping was super fast too.' },
  { id: 2, name: 'Jamie L.', avatar: 'JL', rating: 4, date: 'May 28, 2025', text: 'Really solid product for the price. Minor issue with the packaging on arrival but the item itself is perfect.' },
  { id: 3, name: 'Morgan K.', avatar: 'MK', rating: 5, date: 'May 5, 2025', text: 'Best purchase I\'ve made this year. Highly recommend to anyone looking for premium quality.' },
]

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, addToCart, updateQty, openCart } = useContext(CartContext)

  const product = PRODUCTS.find((p) => p.id === Number(id))

  const cartItem = cart.find((i) => i.id === product?.id)
  const isInCart = Boolean(cartItem)
  const [wishlist, setWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const related = useMemo(() =>
    PRODUCTS.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 5),
    [product]
  )

  if (!product) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <Eye className="w-8 h-8 text-[#444]" />
          </div>
          <p className="font-syne text-white text-lg font-bold">Product Not Found</p>
          <p className="font-dmsans text-[#555] text-sm">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#c8f537] hover:bg-[#d4ff3d] text-black font-syne font-bold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!isInCart) addToCart(product)
  }

  const handleQtyChange = (delta) => {
    if (!cartItem) return
    const newQty = cartItem.qty + delta
    if (newQty < 1) return
    updateQty(product.id, newQty)
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">
      <NavBar />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-1.5 mb-8" aria-label="Breadcrumb">
          <Link to="/shop" className="font-dmsans text-[#555] text-sm hover:text-[#c8f537] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#333]" />
          <span className="font-dmsans text-[#555] text-sm">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#333]" />
          <span className="font-dmsans text-white text-sm truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

          {/* Left: Image Panel */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl overflow-hidden aspect-square flex items-center justify-center group relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = `https://placehold.co/600x600/1a1a1a/333?text=${encodeURIComponent(product.name)}`
                }}
              />
              {/* Wishlist overlay */}
              <button
                onClick={() => setWishlist((w) => !w)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${wishlist
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-[#1a1a1a]/80 border-[#2a2a2a] text-[#555] hover:border-red-500/50 hover:text-red-400'
                  }`}
              >
                <Heart className={`w-4 h-4 ${wishlist ? 'fill-red-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-5">
            {/* Category Badge */}
            <span className="inline-flex w-fit bg-[#c8f537]/10 border border-[#c8f537]/30 text-[#c8f537] text-xs font-dmsans font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="font-syne text-white text-3xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <StarRating rating={product.rating} reviews={product.reviews} size="lg" />

            {/* Divider */}
            <div className="h-px bg-[#2a2a2a]" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-syne text-[#c8f537] text-4xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-dmsans text-[#444] text-sm line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className="font-dmsans text-emerald-400 text-xs font-semibold bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </div>

            {/* Description */}
            <p className="font-dmsans text-[#888] text-sm leading-relaxed">
              High-quality {product.name.toLowerCase()} crafted for performance and style.
              Designed for everyday use with premium materials and exceptional durability.
              Perfect for both enthusiasts and professionals who demand the best.
            </p>

            {/* Divider */}
            <div className="h-px bg-[#2a2a2a]" />

            {/* Quantity controls (when in cart) */}
            {isInCart && (
              <div className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3">
                <span className="font-dmsans text-[#666] text-sm">In cart:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    className="w-7 h-7 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#c8f537]/40 transition-colors disabled:opacity-30"
                    disabled={cartItem?.qty <= 1}
                  >
                    <Minus className="w-3.5 h-3.5 text-white" />
                  </button>
                  <span className="font-syne text-white text-base font-bold w-6 text-center">
                    {cartItem?.qty}
                  </span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    className="w-7 h-7 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#c8f537]/40 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 font-syne font-bold text-sm py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] ${isInCart
                  ? 'bg-[#1a1a1a] border border-[#c8f537]/40 text-[#c8f537]'
                  : 'bg-[#c8f537] hover:bg-[#d4ff3d] text-black'
                  }`}
              >
                {isInCart ? (
                  <><Check className="w-4 h-4" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                )}
              </button>
              <button
                onClick={() => setWishlist((w) => !w)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${wishlist
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#555] hover:border-red-500/50 hover:text-red-400'
                  }`}
              >
                <Heart className={`w-4.5 h-4.5 ${wishlist ? 'fill-red-400' : ''}`} />
              </button>
            </div>

            {/* View Cart link */}
            {isInCart && (
              <button
                onClick={openCart}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c8f537]/30 text-white font-dmsans text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
              >
                View Cart
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'On orders $80+' },
                { icon: ShieldCheck, label: 'Secure Pay', sub: '256-bit SSL' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30-day policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-[#c8f537]" />
                  <span className="font-dmsans text-white text-[11px] font-semibold">{label}</span>
                  <span className="font-dmsans text-[#555] text-[10px]">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ─────────────────────────── */}
        <div className="mb-14">
          {/* Tab Headers */}
          <div className="flex gap-0 border-b border-[#2a2a2a] mb-8">
            {['description', 'specs', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-dmsans text-sm font-medium px-6 py-3 capitalize border-b-2 transition-all duration-200 ${activeTab === tab
                  ? 'border-[#c8f537] text-[#c8f537]'
                  : 'border-transparent text-[#555] hover:text-white'
                  }`}
              >
                {tab === 'reviews' ? `Reviews (${FAKE_REVIEWS.length})` : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="max-w-2xl">
              <p className="font-dmsans text-[#888] text-sm leading-7 mb-4">
                Experience the next level of quality with the <span className="text-white font-medium">{product.name}</span>.
                Built with precision engineering and premium materials, this product is designed to exceed your expectations.
              </p>
              <p className="font-dmsans text-[#888] text-sm leading-7 mb-6">
                Whether you're a seasoned professional or just getting started, the {product.name} delivers consistent,
                reliable performance every single time. Its ergonomic design ensures comfort during extended use, while
                the durable construction guarantees longevity.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Premium-grade materials for lasting durability',
                  'Ergonomically designed for comfortable use',
                  'Compatible with all major platforms and devices',
                  'Backed by a 1-year manufacturer warranty',
                  'Award-winning design recognized globally',
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8f537] mt-2 shrink-0" />
                    <span className="font-dmsans text-[#999] text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
                {[
                  ['Category', product.category],
                  ['Brand', 'SkyMart Originals'],
                  ['Model', `SM-${product.id.toString().padStart(4, '0')}`],
                  ['Rating', `${product.rating}.0 / 5.0`],
                  ['Reviews', `${product.reviews} verified`],
                  ['Price', `$${product.price.toFixed(2)}`],
                  ['Warranty', '12 Months'],
                  ['Availability', 'In Stock'],
                ].map(([key, val], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-5 py-3.5 ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                      } ${i !== 7 ? 'border-b border-[#2a2a2a]' : ''}`}
                  >
                    <span className="font-dmsans text-[#555] text-sm">{key}</span>
                    <span className="font-dmsans text-white text-sm font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl flex flex-col gap-4">
              {/* Rating summary */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-8 mb-2">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-syne text-[#c8f537] text-5xl font-bold">{product.rating}.0</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= product.rating ? 'fill-[#c8f537] text-[#c8f537]' : 'fill-[#2a2a2a] text-[#2a2a2a]'}`} />
                    ))}
                  </div>
                  <span className="font-dmsans text-[#555] text-xs">{product.reviews} reviews</span>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === product.rating ? 68 : star === product.rating - 1 ? 20 : star > product.rating ? 0 : 6
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="font-dmsans text-[#555] text-xs w-3">{star}</span>
                        <Star className="w-3 h-3 fill-[#c8f537] text-[#c8f537]" />
                        <div className="flex-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#c8f537] rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-dmsans text-[#555] text-xs w-6 text-right">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Individual reviews */}
              {FAKE_REVIEWS.map((review) => (
                <div key={review.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#c8f537]/20 border border-[#c8f537]/30 flex items-center justify-center">
                        <span className="font-syne text-[#c8f537] text-xs font-bold">{review.avatar}</span>
                      </div>
                      <div>
                        <p className="font-dmsans text-white text-sm font-semibold">{review.name}</p>
                        <p className="font-dmsans text-[#555] text-xs">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-[#c8f537] text-[#c8f537]' : 'fill-[#2a2a2a] text-[#2a2a2a]'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="font-dmsans text-[#888] text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-syne text-white text-2xl font-bold">Related Products</h2>
              <Link
                to="/shop"
                className="font-dmsans text-[#555] text-sm hover:text-[#c8f537] transition-colors flex items-center gap-1"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

   
      <footer className="border-t border-[#1e1e1e] py-6 text-center mt-8">
        <p className="font-syne text-[#c8f537] text-base font-semibold tracking-tight">SkyMart</p>
        <p className="font-dmsans text-[#444] text-xs mt-1">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </footer>
    </div>
  )
}

export default ProductDetailPage
