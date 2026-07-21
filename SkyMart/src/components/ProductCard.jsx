import React, { useState, useContext } from 'react'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router'

const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className={`w-3 h-3 ${s <= rating ? 'fill-[#c8f537] text-[#c8f537]' : 'fill-[#333] text-[#333]'}`}
                />
            ))}
        </div>
        <span className="font-dmsans text-[#666] text-xs">({reviews})</span>
    </div>
)

const ProductCard = ({ product }) => {
    const { cart, addToCart } = useContext(CartContext)
    const navigate = useNavigate()

    const isAdded = cart.some((item) => item.id === product.id)

    const handleAdd = (e) => {
        e.stopPropagation()
        if (!isAdded) {
            addToCart(product)
        }
    }

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden group hover:border-[#c8f537]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,245,55,0.07)] flex flex-col">
            {/* Image */}
            <div className="relative overflow-hidden bg-[#111] h-[185px]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = `https://placehold.co/400x300/1a1a1a/333?text=${encodeURIComponent(product.name)}`
                    }}
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#2a2a2a] text-[#aaa] text-[10px] font-dmsans font-medium px-2.5 py-1 rounded-full">
                    {product.category}
                </span>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                    <span className="text-[#555] text-[10px] font-dmsans uppercase tracking-widest">{product.category}</span>
                    <h3 className="font-dmsans text-white text-sm font-medium mt-0.5 line-clamp-2 leading-snug">
                        {product.name}
                    </h3>
                </div>

                <StarRating rating={product.rating} reviews={product.reviews} />

                {/* Price + Add */}
                <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="font-syne text-white text-base font-bold">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAdd}
                        className={`flex items-center gap-1.5 text-xs font-dmsans font-semibold px-3.5 py-2 rounded-full transition-all duration-300 ${
                            isAdded
                                ? 'bg-[#37f53a] text-black'
                                : 'bg-[#c8f537] text-black hover:bg-[#d4ff3d] active:scale-95'
                        }`}
                    >
                        {isAdded ? (
                            <>
                                <Check className="w-3 h-3" />
                                Added
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-3 h-3" />
                                Add
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard