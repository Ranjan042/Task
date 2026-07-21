import React, { useContext } from 'react'
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { CartContext } from '../context/CartContext'
// import { useNavigate } from 'react-router'

const CartDrawer = () => {

  //The func comming from the cartContext
  const {cart,isCartOpen,closeCart,cartCount,cartTotal,removeFromCart,updateQty,clearCart} = useContext(CartContext)

  // const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
  }

  return (
    <>
      {/* This is the bg Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isCartOpen
            ? 'bg-black/60 backdrop-blur-sm pointer-events-auto'
            : 'bg-transparent backdrop-blur-none pointer-events-none'
        }`}
      />

      {/* This is the Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#111111] border-l border-[#2a2a2a] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/*Cart Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#c8f537]" />
            <span className="font-syne text-white text-base font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#c8f537]/20 text-[#c8f537] text-xs font-dmsans font-semibold px-2 py-0.5 rounded-full border border-[#c8f537]/30">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

        
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center hover:border-[#c8f537]/40 transition-colors"
          >
            <X className="w-4 h-4 text-[#888]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 pb-10">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-[#333]" />
              </div>
              <p className="font-dmsans text-[#555] text-sm text-center">
                Your cart is empty.<br />Add some products!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 flex items-start gap-3"
              >
           
                <div className="w-[64px] h-[64px] rounded-lg overflow-hidden bg-[#222] shrink-0 border border-[#2a2a2a]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/64x64/1a1a1a/333?text=?`
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-dmsans text-white text-xs font-medium leading-snug line-clamp-2">
                    {item.name}
                  </p>
                  <p className="font-syne text-[#c8f537] text-sm font-bold mt-1">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <p className="font-dmsans text-[#555] text-[10px]">
                    ${item.price.toFixed(2)} each
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="w-6 h-6 rounded bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#c8f537]/40 transition-colors disabled:opacity-30"
                    >
                      <Minus className="w-3 h-3 text-white" />
                    </button>
                    <span className="font-dmsans text-white text-xs w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#c8f537]/40 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>

                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-900/20 transition-colors group shrink-0 mt-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#444] group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            ))
          )}
        </div>


        {cart.length > 0 && (
          <div className="border-t border-[#2a2a2a] px-5 py-4 flex flex-col gap-3">
       =
            <div className="flex items-center justify-between">
              <span className="font-dmsans text-[#888] text-sm">Total</span>
              <span className="font-syne text-white text-lg font-bold">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

   
            <button
              onClick={handleCheckout}
              className="w-full bg-[#c8f537] hover:bg-[#d4ff3d] active:scale-[0.98] text-black font-syne font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
            >
              Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            
            <button
              onClick={clearCart}
              className="font-dmsans text-[#555] text-xs text-center hover:text-red-400 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
