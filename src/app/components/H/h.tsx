'use client'

// Components
import { useContext } from 'react'
import HeadingLevel from '@/app/context/HeadingLevel'
// Types
import type { ReactNode } from 'react'


const Heading2: React.FC<HProps> = ({ children, className = '' }) => (
  <h2 className={`text-2xl font-bold mb- text-white ${className}`}>
    {children}
  </h2>
)

const Heading3: React.FC<HProps> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold mb-6 text-white ${className}`}>
    {children}
  </h3>
)

const Heading4: React.FC<HProps> = ({ children, className = '' }) => (
  <h4 className={`text-sm text-secondary-500 font-semibold uppercase ${className}`}>
    {children}
  </h4>
)

const Heading5: React.FC<HProps> = ({ children, className = '' }) => (
  <h5 className={`text-sm font-semibold ${className}`}>
    {children}
  </h5>
)

const Heading6: React.FC<HProps> = ({ children, className = '' }) => (
  <h6 className={`text-sm text-grey-600 font-semibold ${className}`}>
    {children}
  </h6>
)

const headings: Record<string, React.FC<HProps>> = {
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6
}

export type HProps = {
  children: ReactNode | string;
  className?: string;
}

export const H = (props: HProps) => {
  const level = useContext(HeadingLevel)
  const SpecificHeading = headings[`Heading${Math.min(level, 6)}`]
  return <SpecificHeading {...props} />
}