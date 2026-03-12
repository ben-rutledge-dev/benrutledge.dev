import { render, screen } from '@testing-library/react'
import { Level2, Level3, Level4, Level5, Level6, Level7 } from './h.stories'

describe('H', () => {
  const Heading2 = <Level2 />
  const Heading3 = <Level3 />
  const Heading4 = <Level4 />
  const Heading5 = <Level5 />
  const Heading6 = <Level6 />
  const ExceededMaximum = < Level7 />

  it('renders a h2', () => {
    const { container } = render(Heading2)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m a H2')
    expect(el.tagName).toEqual('H2')
  })

  it('renders a h3', () => {
    const { container } = render(Heading3)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m a H3')
    expect(el.tagName).toEqual('H3')
  })

  it('renders a h4', () => {
    const { container } = render(Heading4)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m a H4')
    expect(el.tagName).toEqual('H4')
  })

  it('renders a h5', () => {
    const { container } = render(Heading5)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m a H5')
    expect(el.tagName).toEqual('H5')
  })

  it('renders a h6', () => {
    const { container } = render(Heading6)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m a H6')
    expect(el.tagName).toEqual('H6')
  })

  it('renders a h6', () => {
    const { container } = render(Heading6)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m a H6')
    expect(el.tagName).toEqual('H6')
  })

  it('still renders a h6 when 7 levels deep', () => {
    const { container } = render(ExceededMaximum)
    expect(container).toMatchSnapshot()
    const el = screen.getByText('I\'m still a H6')
    expect(el.tagName).toEqual('H6')
  })
})
