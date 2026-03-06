import { useState } from 'react'
import LandingPage from './components/LandingPage'
import GameSelection from './components/GameSelection'
import GridSelector from './components/GridSelector'
import TicTacToe from './components/TicTacToe'

type Page =
  | { screen: 'landing' }
  | { screen: 'games' }
  | { screen: 'gridSelect' }
  | { screen: 'tictactoe'; gridSize: number }

function App() {
  const [page, setPage] = useState<Page>({ screen: 'landing' })

  switch (page.screen) {
    case 'landing':
      return <LandingPage onGetStarted={() => setPage({ screen: 'games' })} />
    case 'games':
      return (
        <GameSelection
          onSelectTicTacToe={() => setPage({ screen: 'gridSelect' })}
          onBack={() => setPage({ screen: 'landing' })}
        />
      )
    case 'gridSelect':
      return (
        <GridSelector
          onSelectSize={(size) => setPage({ screen: 'tictactoe', gridSize: size })}
          onBack={() => setPage({ screen: 'games' })}
        />
      )
    case 'tictactoe':
      return (
        <TicTacToe
          gridSize={page.gridSize}
          onBack={() => setPage({ screen: 'gridSelect' })}
        />
      )
  }
}

export default App
