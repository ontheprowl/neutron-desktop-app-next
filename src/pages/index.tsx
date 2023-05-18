'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()


  useEffect(()=>{
    router.push('/signup')
  },[router])



}
