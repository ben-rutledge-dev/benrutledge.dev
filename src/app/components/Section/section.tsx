'use client'
// Components
import { useContext } from 'react'
import HeadingLevel from '@/app/context/HeadingLevel'
// Types
import type { ReactNode } from 'react'

export type SectionProps = {
  children: ReactNode | string;
}

export const Section = ({ children }: SectionProps) => {
  const level = useContext(HeadingLevel)

  return (
    <HeadingLevel.Provider value={level + 1}>
      {children}
    </HeadingLevel.Provider>
  )
}