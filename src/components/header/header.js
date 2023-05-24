'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '@/lib/utils'
import { useShoppingCart } from '@/hooks/use-shopping-cart'

export function Header() {
  const { totalPrice, cartCount } = useShoppingCart()

  return (
    <header className="sticky top-0 bg-white z-10 shadow">
      <div className="container xl:max-w-screen-xl mx-auto p-6 flex justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/leaf.svg" alt="Logo" width={32} height={32} />
            <span className="hidden sm:inline-block font-extrabold text-3xl text-gray-700">
              MyPlantShop
            </span>
          </div>
        </Link>
        <Link href="/cart">
          <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <div className="relative">
              <ShoppingCartIcon className="w-7 h-7 flex-shrink-0" />
            </div>
            <p className="text-lg">
              {formatCurrency(totalPrice)}{' '}
              <span className="text-sm text-gray-500">({cartCount})</span>
            </p>
          </div>
        </Link>
      </div>
    </header>
  )
}
