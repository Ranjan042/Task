import React from 'react'
import AppRoute from './Routes/AppRoute'
import CartDrawer from './components/CartDrawer'

const App = () => {
  return (
    <main>
      <AppRoute />

      <CartDrawer />
    </main>
  )
}

export default App