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
const gameDuration = 60 // seconds
let remainingTime = gameDuration

// Start a timer to decrement remainingTime
setInterval(() => {
  if (remainingTime > 0) {
    remainingTime -= 1;
  }
}, 1000);

app.frame('/', (c) => {
  const { buttonValue } = c;

  if (buttonValue === 'click_me' && remainingTime > 0) {
    score += 1;
    animationState = !animationState;
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
