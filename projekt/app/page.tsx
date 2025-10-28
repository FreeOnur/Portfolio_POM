'use client'

import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { SkillTreeSection } from '@/components/SkillTreeSection'
import { TeamSection } from '@/components/TeamSection'
import { ContactSection } from '@/components/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillTreeSection />
      <TeamSection />
      <ContactSection />
    </div>
  )
}
