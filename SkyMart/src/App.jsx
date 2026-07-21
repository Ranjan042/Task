import React from 'react'
import AppRoute from './Routes/AppRoute'
import CartDrawer from './components/CartDrawer'

const App = () => {
  return (
    <main>
      <AppRoute />
      {/* Cart drawer is rendered at root so it overlays every page */}
      <CartDrawer />
    </main>
  )
}

export default App