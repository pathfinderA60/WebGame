import { useState, useCallback, useEffect } from 'react'

type Cell = 'X' | 'O' | null

interface TicTacToeProps {
  gridSize: number
  onBack: () => void
}

// --- AI logic ---

function getWinLength(gridSize: number): number {
  // 3×3 → need 3, 5×5 → need 4, 7×7 → need 4
  return gridSize <= 3 ? 3 : 4
}

function checkWinner(board: Cell[], gridSize: number): Cell {
  const winLen = getWinLength(gridSize)
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal ↘
    [1, -1],  // diagonal ↙
  ]

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = board[row * gridSize + col]
      if (!cell) continue

      for (const [dr, dc] of directions) {
        const endRow = row + dr * (winLen - 1)
        const endCol = col + dc * (winLen - 1)
        if (endRow < 0 || endRow >= gridSize || endCol < 0 || endCol >= gridSize) continue

        let won = true
        for (let k = 1; k < winLen; k++) {
          if (board[(row + dr * k) * gridSize + (col + dc * k)] !== cell) {
            won = false
            break
          }
        }
        if (won) return cell
      }
    }
  }
  return null
}

function isBoardFull(board: Cell[]): boolean {
  return board.every((c) => c !== null)
}

// Minimax for 3×3 (perfect play)
function minimax(board: Cell[], gridSize: number, isMaximizing: boolean, depth: number): number {
  const winner = checkWinner(board, gridSize)
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (isBoardFull(board)) return 0

  let best = isMaximizing ? -Infinity : Infinity
  for (let i = 0; i < board.length; i++) {
    if (board[i]) continue
    board[i] = isMaximizing ? 'O' : 'X'
    const score = minimax(board, gridSize, !isMaximizing, depth + 1)
    board[i] = null
    best = isMaximizing ? Math.max(best, score) : Math.min(best, score)
  }
  return best
}

function getBestMove3x3(board: Cell[], gridSize: number): number {
  let bestScore = -Infinity
  let bestMove = -1
  for (let i = 0; i < board.length; i++) {
    if (board[i]) continue
    board[i] = 'O'
    const score = minimax(board, gridSize, false, 0)
    board[i] = null
    if (score > bestScore) {
      bestScore = score
      bestMove = i
    }
  }
  return bestMove
}

// Heuristic AI for larger boards
function scoreLineForAI(board: Cell[], indices: number[]): number {
  let os = 0, xs = 0
  for (const i of indices) {
    if (board[i] === 'O') os++
    else if (board[i] === 'X') xs++
  }
  if (os > 0 && xs > 0) return 0
  if (os > 0) return os * os * 10
  if (xs > 0) return -(xs * xs * 8) // slightly lower weight → offensive bias
  return 1
}

function getBestMoveLarge(board: Cell[], gridSize: number): number {
  const winLen = getWinLength(gridSize)
  const lines: number[][] = []

  // Collect all lines of length winLen
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c <= gridSize - winLen; c++) {
      lines.push(Array.from({ length: winLen }, (_, k) => r * gridSize + c + k))
    }
  }
  for (let c = 0; c < gridSize; c++) {
    for (let r = 0; r <= gridSize - winLen; r++) {
      lines.push(Array.from({ length: winLen }, (_, k) => (r + k) * gridSize + c))
    }
  }
  for (let r = 0; r <= gridSize - winLen; r++) {
    for (let c = 0; c <= gridSize - winLen; c++) {
      lines.push(Array.from({ length: winLen }, (_, k) => (r + k) * gridSize + (c + k)))
      lines.push(Array.from({ length: winLen }, (_, k) => (r + k) * gridSize + (c + winLen - 1 - k)))
    }
  }

  const scores = new Float64Array(board.length)
  for (const line of lines) {
    const s = scoreLineForAI(board, line)
    for (const i of line) {
      if (!board[i]) scores[i] += s
    }
  }

  // Center bias
  const center = Math.floor(gridSize / 2)
  const centerIdx = center * gridSize + center
  if (!board[centerIdx]) scores[centerIdx] += 15

  let bestScore = -Infinity
  let bestMoves: number[] = []
  for (let i = 0; i < board.length; i++) {
    if (board[i]) continue
    if (scores[i] > bestScore) {
      bestScore = scores[i]
      bestMoves = [i]
    } else if (scores[i] === bestScore) {
      bestMoves.push(i)
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}

function getComputerMove(board: Cell[], gridSize: number): number {
  if (gridSize === 3) return getBestMove3x3([...board], gridSize)
  return getBestMoveLarge(board, gridSize)
}

// --- Component ---

export default function TicTacToe({ gridSize, onBack }: TicTacToeProps) {
  const totalCells = gridSize * gridSize
  const [board, setBoard] = useState<Cell[]>(() => Array(totalCells).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState<Cell>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [scores, setScores] = useState({ player: 0, computer: 0, draws: 0 })
  const [winningCells, setWinningCells] = useState<Set<number>>(new Set())

  const findWinningCells = useCallback(
    (b: Cell[], w: Cell): Set<number> => {
      const winLen = getWinLength(gridSize)
      const cells = new Set<number>()
      const directions = [[0, 1], [1, 0], [1, 1], [1, -1]]

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (b[row * gridSize + col] !== w) continue
          for (const [dr, dc] of directions) {
            const endRow = row + dr * (winLen - 1)
            const endCol = col + dc * (winLen - 1)
            if (endRow < 0 || endRow >= gridSize || endCol < 0 || endCol >= gridSize) continue
            let won = true
            for (let k = 1; k < winLen; k++) {
              if (b[(row + dr * k) * gridSize + (col + dc * k)] !== w) { won = false; break }
            }
            if (won) {
              for (let k = 0; k < winLen; k++) cells.add((row + dr * k) * gridSize + (col + dc * k))
            }
          }
        }
      }
      return cells
    },
    [gridSize]
  )

  // Computer move
  useEffect(() => {
    if (isPlayerTurn || winner || isDraw) return
    const timer = setTimeout(() => {
      const move = getComputerMove(board, gridSize)
      if (move === -1) return
      const newBoard = [...board]
      newBoard[move] = 'O'
      setBoard(newBoard)

      const w = checkWinner(newBoard, gridSize)
      if (w) {
        setWinner(w)
        setWinningCells(findWinningCells(newBoard, w))
        setScores((s) => ({ ...s, computer: s.computer + 1 }))
      } else if (isBoardFull(newBoard)) {
        setIsDraw(true)
        setScores((s) => ({ ...s, draws: s.draws + 1 }))
      } else {
        setIsPlayerTurn(true)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [isPlayerTurn, board, winner, isDraw, gridSize, findWinningCells])

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] || winner || isDraw) return
    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)

    const w = checkWinner(newBoard, gridSize)
    if (w) {
      setWinner(w)
      setWinningCells(findWinningCells(newBoard, w))
      setScores((s) => ({ ...s, player: s.player + 1 }))
    } else if (isBoardFull(newBoard)) {
      setIsDraw(true)
      setScores((s) => ({ ...s, draws: s.draws + 1 }))
    } else {
      setIsPlayerTurn(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(totalCells).fill(null))
    setWinner(null)
    setIsDraw(false)
    setWinningCells(new Set())
    setIsPlayerTurn(true)
  }

  // Cell sizing
  const cellSize =
    gridSize <= 3 ? 'w-24 h-24 text-4xl' :
    gridSize <= 5 ? 'w-16 h-16 text-2xl' :
                    'w-12 h-12 text-xl'

  const statusText = winner
    ? winner === 'X'
      ? '🎉 You Win!'
      : '🤖 Computer Wins!'
    : isDraw
    ? "🤝 It's a Draw!"
    : isPlayerTurn
    ? 'Your turn (X)'
    : 'Computer thinking...'

  const statusColor = winner
    ? winner === 'X' ? 'text-green-400' : 'text-red-400'
    : isDraw ? 'text-yellow-400' : 'text-indigo-300'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex flex-col items-center p-6 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>←</span> Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Tic Tac Toe — {gridSize}×{gridSize}
          </h1>
          <div className="w-16" /> {/* spacer */}
        </div>

        {/* Scoreboard */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-gray-800/70 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider">You (X)</div>
            <div className="text-2xl font-bold text-green-400">{scores.player}</div>
          </div>
          <div className="bg-gray-800/70 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Draw</div>
            <div className="text-2xl font-bold text-yellow-400">{scores.draws}</div>
          </div>
          <div className="bg-gray-800/70 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider">AI (O)</div>
            <div className="text-2xl font-bold text-red-400">{scores.computer}</div>
          </div>
        </div>

        {/* Status */}
        <p className={`text-center text-xl font-semibold mb-6 ${statusColor}`}>
          {statusText}
        </p>

        {/* Board */}
        <div className="flex justify-center mb-8">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {board.map((cell, i) => {
              const isWin = winningCells.has(i)
              return (
                <button
                  key={i}
                  onClick={() => handleCellClick(i)}
                  disabled={!!cell || !!winner || isDraw || !isPlayerTurn}
                  className={`
                    ${cellSize} rounded-lg font-bold flex items-center justify-center
                    transition-all duration-200 cursor-pointer
                    ${
                      isWin
                        ? 'bg-indigo-600/60 scale-105 ring-2 ring-indigo-400'
                        : cell
                        ? 'bg-gray-700/80'
                        : 'bg-gray-800/80 hover:bg-gray-700/80'
                    }
                    ${cell === 'X' ? 'text-blue-400' : cell === 'O' ? 'text-red-400' : 'text-transparent'}
                    disabled:cursor-default
                  `}
                >
                  {cell === 'X' ? '✕' : cell === 'O' ? '◯' : '·'}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        {(winner || isDraw) && (
          <div className="flex justify-center gap-4">
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Change Grid
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
