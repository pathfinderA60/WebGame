interface GameSelectionProps {
  onSelectTicTacToe: () => void
  onBack: () => void
}

export default function GameSelection({ onSelectTicTacToe, onBack }: GameSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex flex-col items-center p-8 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -top-20 -right-20" />
      <div className="absolute w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -bottom-20 -left-20" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="self-start text-gray-400 hover:text-white transition-colors mb-8 flex items-center gap-2 cursor-pointer"
      >
        <span>←</span> Back
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10">
        Choose a Game
      </h1>
      <p className="text-gray-400 mb-12 text-lg relative z-10">
        Pick a game and challenge the AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full relative z-10">
        {/* Tic Tac Toe card */}
        <button
          onClick={onSelectTicTacToe}
          className="group bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/60 rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-600/10 cursor-pointer"
        >
          <div className="text-6xl mb-2">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* X */}
              <line x1="8" y1="8" x2="24" y2="24" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="24" y1="8" x2="8" y2="24" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
              {/* O */}
              <circle cx="48" cy="16" r="9" stroke="#a78bfa" strokeWidth="3" fill="none" />
              {/* Grid hints */}
              <line x1="32" y1="4" x2="32" y2="60" stroke="#4b5563" strokeWidth="1.5" />
              <line x1="4" y1="32" x2="60" y2="32" stroke="#4b5563" strokeWidth="1.5" />
              {/* X bottom */}
              <line x1="8" y1="40" x2="24" y2="56" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="24" y1="40" x2="8" y2="56" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
              {/* O bottom */}
              <circle cx="48" cy="48" r="9" stroke="#a78bfa" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            Tic Tac Toe
          </h2>
          <p className="text-gray-400 text-sm text-center">
            Classic 3×3 X and O
          </p>
        </button>

        {/* Coming Soon card */}
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 flex flex-col items-center gap-4 opacity-60">
          <div className="text-6xl mb-2 grayscale">🎮</div>
          <h2 className="text-2xl font-bold text-gray-500">Coming Soon</h2>
          <p className="text-gray-600 text-sm text-center">
            More games on the way — stay tuned!
          </p>
          <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400 uppercase tracking-wider">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  )
}
