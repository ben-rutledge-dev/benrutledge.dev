export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Content overlay with slide-in animation */}
      <div className="relative z-10 flex items-end justify-center h-full pb-20 animate-slide-in-up">
        <div className="text-center px-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Ben Rutledge
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Front-End Developer | Interactive Experiences | Creative Coder
          </p>
        </div>
      </div>
    </main>
  );
}
