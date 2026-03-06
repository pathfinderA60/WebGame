interface GridSelectorProps {
  onSelectSize: (size: number) => void
  onBack: () => void
}

const gridOptions = [
  { size: 3, label: '3 × 3', description: 'Classic', color: 'from-indigo-500 to-indigo-600' },
]

export default function GridSelector({ onSelectSize, onBack }: GridSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex flex-col items-center p-8">
      <button
        onClick={onBack}
        className="self-start text-gray-400 hover:text-white transition-colors mb-8 flex items-center gap-2 cursor-pointer"
      >
        <span>←</span> Back
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Tic Tac Toe</h1>
      <p className="text-gray-400 mb-12 text-lg">Choose your grid size</p>

      <div className="flex flex-col md:flex-row gap-6">
        {gridOptions.map((opt) => (
          <button
            key={opt.size}
            onClick={() => onSelectSize(opt.size)}
            className="group relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/60 rounded-2xl p-8 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer min-w-[180px]"
          >
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
            >
              {opt.size}²
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {opt.label}
            </h2>
            <span className="text-gray-400 text-sm">{opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
