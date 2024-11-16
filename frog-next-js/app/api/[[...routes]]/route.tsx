/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

// Game configuration
const GAME_CONFIG = {
  duration: 7,
  initialScore: 0,
  assetsPath: '/',
  basePath: '/api',
  title: 'Click the Button Game',
}

// Game state management
const gameState = {
  score: GAME_CONFIG.initialScore,
  remainingTime: GAME_CONFIG.duration,
  isGameStarted: false,
  isAnimated: false,
}

const app = new Frog({
  assetsPath: GAME_CONFIG.assetsPath,
  basePath: GAME_CONFIG.basePath,
  title: GAME_CONFIG.title,
})

// Timer management
let gameTimer: any = null

const startGameTimer = () => {
  if (!gameTimer) {
    gameTimer = setInterval(() => {
      if (gameState.isGameStarted && gameState.remainingTime > 0) {
        gameState.remainingTime -= 1
        if (gameState.remainingTime <= 0) {
          clearInterval(gameTimer)
          gameTimer = null
        }
      }
    }, 1000)
  }
}

const resetGame = () => {
  if (gameTimer) {
    clearInterval(gameTimer)
    gameTimer = null
  }
  gameState.score = GAME_CONFIG.initialScore
  gameState.remainingTime = GAME_CONFIG.duration
  gameState.isGameStarted = false
  gameState.isAnimated = false
}

// Game frame handler
app.frame('/', (c) => {
  const { buttonValue } = c

  // Handle button clicks
  switch (buttonValue) {
    case 'click_me':
      if (gameState.remainingTime > 0) {
        if (!gameState.isGameStarted) {
          gameState.isGameStarted = true
          startGameTimer()
        }
        gameState.score += 1
        gameState.isAnimated = !gameState.isAnimated
      }
      break
    case 'reset_me':
      resetGame()
      break
  }

  // Game over state
  if (gameState.remainingTime <= 0) {
    return c.res({
      title: 'Game Over',
      image: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          <h1 style={{ color: '#000000', marginBottom: '20px' }}>Game Over!</h1>
          <h2 style={{ color: '#000000' }}>Final Score: {gameState.score}</h2>
        </div>
      ),
      intents: [
        <Button value="reset_me">Play Again</Button>
      ],
    })
  }

  // Active game state
  const barbellImage = gameState.isAnimated
    ? '/images/barbell_down.png'
    : '/images/barbell_up.png'

  return c.res({
    title: GAME_CONFIG.title,
    image: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <h1 style={{ color: '#000000', marginBottom: '20px' }}>
          Time: {gameState.remainingTime}s
        </h1>
        <h2 style={{ color: '#000000', marginBottom: '20px' }}>
          Score: {gameState.score}
        </h2>
        <img
          src={barbellImage}
          alt="Barbell Animation"
          style={{
            width: '150px',
            height: '150px',
            marginBottom: '20px',
          }}
        />
      </div>
    ),
    intents: [
      <Button value="click_me">Click me!</Button>,
    ],
  })
})

// Development tools setup
devtools(app, { serveStatic })

// Export handlers
export const GET = handle(app)
export const POST = handle(app)