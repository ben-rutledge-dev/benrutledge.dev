import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Section } from './section'
import { H } from '@/app/components/H'

describe('Section', () => {
  const component = (
    <Section>
      <H>foobar</H>
    </Section>
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders expected snapshot', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })

  it('renders expected children', () => {
    render(component)
    const el = screen.getByText('foobar')
    expect(el).toBeInTheDocument()
    expect(el.tagName).toEqual('H3')
  })
})
