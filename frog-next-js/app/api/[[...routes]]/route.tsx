/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Click the Button Game',
})

// Game state
let score = 0
let animationState = false
const gameDuration = 7 // seconds
let remainingTime = gameDuration
let gameStarted = false

// Start a timer to decrement remainingTime only when the game starts
const timerInterval = setInterval(() => {
  if (gameStarted && remainingTime > 0) {
    remainingTime -= 1
  }
}, 1000)

const resetGame = () => {
  score = 0
  remainingTime = gameDuration
  gameStarted = false
  animationState = false
}

app.frame('/', (c) => {
  const { buttonValue } = c;

  // Start the game when the button is clicked
  if (buttonValue === 'click_me' && remainingTime > 0) {
    if (!gameStarted) {
      gameStarted = true
    }
    score += 1
    animationState = !animationState
  }

  if (buttonValue === 'reset_me') {
    score = 0
    remainingTime = gameDuration
    gameStarted = false
    animationState = false
  }

  if (remainingTime <= 0) {
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
          <h1 style={{ color: '#000000', marginBottom: '20px' }}>Game Over</h1>
          <h2 style={{ color: '#000000' }}>Final Score: {score}</h2>
        </div>
      ),
      intents: [
        <Button value="reset_me">Reset!</Button>
      ],
    });
  }

  // Determine barbell image
  const barbellImage = animationState
    ? 'http://localhost:3000/images/barbell_down.png'
    : 'http://localhost:3000/images/barbell_up.png';

  return c.res({
    title: 'Click the Button Game',
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
          Time: {remainingTime}s
        </h1>
        <h2 style={{ color: '#000000', marginBottom: '20px' }}>Score: {score}</h2>
        <img
          src={barbellImage}
          alt="Barbell"
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
  });
});

// Enable devtools
devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
