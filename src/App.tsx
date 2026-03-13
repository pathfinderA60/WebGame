import { useState } from 'react'
import LandingPage from './components/LandingPage'
import GameSelection from './components/GameSelection'
import ModeSelector from './components/ModeSelector'
import type { GameMode } from './components/ModeSelector'
import GridSelector from './components/GridSelector'
import TicTacToe from './components/TicTacToe'
import DrawingGame from './components/DrawingGame'
import Hyperspeed from './components/Hyperspeed'

type Page =
  | { screen: 'landing' }
  | { screen: 'games' }
  | { screen: 'modeSelect' }
  | { screen: 'gridSelect'; mode: GameMode }
  | { screen: 'tictactoe'; gridSize: number; mode: GameMode }
  | { screen: 'drawingGame' }

function App() {
  const [page, setPage] = useState<Page>({ screen: 'landing' })

  const renderScreen = () => {
    switch (page.screen) {
      case 'landing':
        return <LandingPage onGetStarted={() => setPage({ screen: 'games' })} />
      case 'games':
        return (
          <GameSelection
            onSelectTicTacToe={() => setPage({ screen: 'modeSelect' })}
            onSelectDrawingGame={() => setPage({ screen: 'drawingGame' })}
            onBack={() => setPage({ screen: 'landing' })}
          />
        )
      case 'modeSelect':
        return (
          <ModeSelector
            onSelectMode={(mode) => setPage({ screen: 'gridSelect', mode })}
            onBack={() => setPage({ screen: 'games' })}
          />
        )
      case 'gridSelect':
        return (
          <GridSelector
            onSelectSize={(size) => setPage({ screen: 'tictactoe', gridSize: size, mode: page.mode })}
            onBack={() => setPage({ screen: 'modeSelect' })}
          />
        )
      case 'tictactoe':
        return (
          <TicTacToe
            gridSize={page.gridSize}
            mode={page.mode}
            onBack={() => setPage({ screen: 'gridSelect', mode: page.mode })}
          />
        )
      case 'drawingGame':
        return (
          <DrawingGame
            onBack={() => setPage({ screen: 'games' })}
          />
        )
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Hyperspeed />
      </div>
      <div className="absolute inset-0 w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900/50 via-indigo-950/50 to-gray-900/50 z-10">
        {renderScreen()}
      </div>
    </div>
  )
}

export default App
