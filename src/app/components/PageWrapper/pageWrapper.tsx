type PageWrapperProps = {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
  title?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { children, maxWidth = 'max-w-3xl', padding = 'p-8', title } = props;

  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
      <div className={`relative z-10 animate-slide-in-up ${padding}`}>
        <div className={`${maxWidth} mx-auto`}>
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}