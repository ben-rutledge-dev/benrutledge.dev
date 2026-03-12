export const PageWrapper = ({ children, maxWidth = 'max-w-3xl', padding = 'p-8' }: {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
}) => (
  <div className="relative min-h-screen text-white">
    <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
    <div className={`relative z-10 animate-slide-in-up py-8 ${padding}`}>
      <div className={`${maxWidth} mx-auto`}>
        {children}
      </div>
    </div>
  </div>
);