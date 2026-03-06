import { useState } from 'react'
import LandingPage from './components/LandingPage'
import GameSelection from './components/GameSelection'
import ModeSelector from './components/ModeSelector'
import type { GameMode } from './components/ModeSelector'
import GridSelector from './components/GridSelector'
import TicTacToe from './components/TicTacToe'

type Page =
  | { screen: 'landing' }
  | { screen: 'games' }
  | { screen: 'modeSelect' }
  | { screen: 'gridSelect'; mode: GameMode }
  | { screen: 'tictactoe'; gridSize: number; mode: GameMode }

function App() {
  const [page, setPage] = useState<Page>({ screen: 'landing' })

  switch (page.screen) {
    case 'landing':
      return <LandingPage onGetStarted={() => setPage({ screen: 'games' })} />
    case 'games':
      return (
        <GameSelection
          onSelectTicTacToe={() => setPage({ screen: 'modeSelect' })}
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
  }
}

export default App
