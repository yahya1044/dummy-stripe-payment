'use client'

import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/hooks/use-shopping-cart'
import Head from 'next/head'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>
          E-commerce store built with Next.js and Stripe checkout | AlterClass
        </title>
        <meta
          name="description"
          content="E-commerce store built with Next.js and Stripe checkout by AlterClass.io"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </CartProvider>
    </>
  )
}
