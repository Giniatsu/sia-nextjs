import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Login from '@/pages/login'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}
