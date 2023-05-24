'use client'

import { useState, useEffect, useRef } from 'react'
// import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useShoppingCart } from '@/hooks/use-shopping-cart'
import { formatCurrency } from '@/lib/utils'
import Rating from './Rating'

const ProductCard = ({ product }) => {
  const { cartCount, addItem } = useShoppingCart()

  const [adding, setAdding] = useState(false)

  const toastId = useRef()
  const firstRun = useRef(true)

  const handleOnAddToCart = (e) => {
    console.log('🚀 ~ file: ProductCard.js:18 ~ handleOnAddToCart ~ event:', e)
    e.preventDefault()

    setAdding(true)
    toastId.current = toast.loading('Adding 1 item...')

    if (typeof product.onClickAdd === 'function') {
      product.onClickAdd()
    }

    addItem(product)
  }

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    if (adding) {
      setAdding(false)
      toast.success(`${product.name} added`, {
        id: toastId.current,
      })
    }

    if (typeof product.onAddEnded === 'function') {
      product.onAddEnded()
    }
  }, [cartCount])

  return (
    // <Link href={`/products/${props.id}`}>
    <div className="border rounded-md p-6 group">
      {/* Product's image */}
      <div className="relative w-full h-64 group-hover:transform group-hover:scale-125 group-hover:ease-in-out group-hover:duration-500">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Name + Rating */}
      <div className="mt-4 sm:mt-8">
        <p className="font-semibold text-lg capitalize">{product.name}</p>
        <Rating rate={product?.rating?.rate} count={product?.rating?.count} />
      </div>

      {/* Price + CTA */}
      <div className="mt-4 flex items-center justify-between space-x-2">
        <div>
          <p className="text-gray-500">Price</p>
          <p className="text-lg font-semibold">
            {formatCurrency(product.price, product.currency)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOnAddToCart}
          disabled={adding || product.disabled}
          className={`border rounded-lg py-1 px-4 hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            adding
              ? 'disabled:bg-rose-500 disabled:border-rose-500 disabled:text-white'
              : 'disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-gray-200'
          }`}
        >
          {adding ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
    // </Link>
  )
}

export default ProductCard
