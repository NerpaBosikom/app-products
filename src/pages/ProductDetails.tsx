
import { Link, useParams } from 'react-router-dom'
import { useProductsStore } from '../store/products'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export function ProductDetails() {
  const { id } = useParams()
  const productId = Number(id)
  const product = useProductsStore(s => s.products.find(p => p.id === productId))

  if (!product) {
    return (
      <div className="space-y-4">
        <p>Product not found.</p>
        <Link to="/products"><Button variant="outline"><FiArrowLeft/> Back</Button></Link>
      </div>
    )
  }

  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="grid md:grid-cols-2 gap-6">
      <div>
        <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="w-full rounded-xl border border-violet-200" />
        <div className="mt-2 flex gap-2 flex-wrap">
          {product.images?.slice(1,5).map((src, idx) => (
            <img key={idx} src={src} alt={`${product.title} ${idx}`} className="h-16 w-16 object-cover rounded-md border border-violet-200" />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">{product.title}</h1>
        <div className="mt-2 flex gap-2">
          {product.brand && <Badge>{product.brand}</Badge>}
          {product.category && <Badge>{product.category}</Badge>}
        </div>
        <Separator />
        <p className="text-slate-700">{product.description}</p>
        {product.price !== undefined && <p className="mt-3 text-xl font-semibold text-violet-700">{product.price} $</p>}
        <div className="mt-6 flex gap-3">
          <Link to="/products"><Button variant="outline"><FiArrowLeft/> Back to list</Button></Link>
          <Link to={`/products/${product.id}/edit`}><Button>Edit</Button></Link>
        </div>
      </div>
    </motion.div>
  )
}
