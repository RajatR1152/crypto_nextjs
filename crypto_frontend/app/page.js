import Features from '@/components/Features'
import Hero from '@/components/Hero'
import HeroTable from '@/components/HeroTable'
import React from 'react'

export default function page() {
  return (
    <div className="container w-full overflow-x-hidden">
      <Hero />
      <HeroTable />
      <Features />
    </div>
  )
}
