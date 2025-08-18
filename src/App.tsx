
import { Route, Routes, Navigate } from 'react-router-dom'
import { Products } from './pages/Products'
import { ProductDetails } from './pages/ProductDetails'
import { CreateProduct } from './pages/CreateProduct'
import { EditProduct } from './pages/EditProduct'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 to-violet-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/products" replace/>} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/products/:id/edit" element={<EditProduct />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="*" element={<Navigate to="/products" replace/>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
