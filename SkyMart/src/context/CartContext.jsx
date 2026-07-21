import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const LoadUserFromLs = () => {
    return JSON.parse(localStorage.getItem('Loguser_sm')) || {}
  };

  const [user, setuser] = useState(LoadUserFromLs());

  const SaveCartToLS = (userId, cart) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart || []));
  };
  const LoadCartFromLS = (userId) => {
    if (!userId) return [];
    return JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  };

  const [cart, setcartState] = useState(() => LoadCartFromLS(user?.id));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notify, setnotify] = useState("");
  const setcart = (newCart) => {
    setcartState(newCart);
    SaveCartToLS(user?.id, newCart);
  }

  const openCart = () => {
    setIsCartOpen(true);
  }

  const closeCart = () => {
    setIsCartOpen(false);
  }

  const RenderNotificationUi = (message) => {
    setnotify(message);
    setTimeout(() => {
      setnotify("");
    }, 3000);
  }

  const addToCart = (product) => {
    const isincart = cart.find((item) => item.id === product.id);

    let newCart;

    if (isincart) {
      console.log(isincart);
      updateQty(isincart.id, isincart.qty + 1);
      return;
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }

    setcart(newCart);
    RenderNotificationUi(`Added to cart`);
  }


  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setcart(newCart);
    RenderNotificationUi(`Item removed from cart`);
  }


  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const newCart = cart.map((item) => item.id === id ? { ...item, qty } : item);
    setcart(newCart);
    RenderNotificationUi(`Quantity updated`);
  }

  const clearCart = () => {
    setcart([]);
    RenderNotificationUi("Cart cleared");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, setcart,
      user, setuser,
      isCartOpen, openCart, closeCart,
      cartCount, cartTotal,
      addToCart, removeFromCart, updateQty, clearCart,
      RenderNotificationUi
    }}>
      {children}

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${notify
            ? "translate-x-0 translate-y-0 opacity-100"
            : "-translate-x-10 translate-y-6 opacity-0 pointer-events-none"
          }`}
      >
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2 px-3 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 bg-[#c8f537] rounded-full"></span>
          <p className="font-dmsans text-sm text-[#aaa]">{notify}</p>
        </div>
      </div>
    </CartContext.Provider>
  );
};

export default CartProvider;