interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Cursive title */}
        <h1
          className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg select-none"
          style={{ fontFamily: "'Dancing Script', 'Brush Script MT', 'Segoe Script', cursive" }}
        >
          Challenge the Computer
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-md text-center">
          Test your skills against an AI opponent in classic board games.
        </p>

        {/* Get Started button */}
        <button
          onClick={onGetStarted}
          className="group relative px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          Get Started
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  )
}
