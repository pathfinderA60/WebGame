export type GameMode = 'computer' | 'local'

interface ModeSelectorProps {
  onSelectMode: (mode: GameMode) => void
  onBack: () => void
}

export default function ModeSelector({ onSelectMode, onBack }: ModeSelectorProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex flex-col items-center p-4 sm:p-8 relative overflow-y-auto">
      <button
        onClick={onBack}
        className="self-start text-gray-400 hover:text-white transition-colors mb-4 sm:mb-8 flex items-center gap-2 cursor-pointer text-sm sm:text-base"
      >
        <span>←</span> Back
      </button>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Tic Tac Toe</h1>
      <p className="text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg">Choose your game mode</p>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 px-2">
        {/* vs Computer */}
        <button
          onClick={() => onSelectMode('computer')}
          className="group bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-600/10 cursor-pointer min-w-[200px] sm:min-w-[220px]"
        >
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg">
            🤖
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            vs Computer
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Challenge the AI opponent
          </p>
        </button>

        {/* 2 Player */}
        <button
          onClick={() => onSelectMode('local')}
          className="group bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/10 cursor-pointer min-w-[200px] sm:min-w-[220px]"
        >
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg">
            👥
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
            2 Players
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Play with a friend locally
          </p>
        </button>
      </div>
    </div>
  )
}
