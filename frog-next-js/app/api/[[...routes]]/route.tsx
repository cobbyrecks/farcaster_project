/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
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
let startTime = Date.now()

app.frame('/', (c) => {
  const elapsed = (Date.now() - startTime) / 1000;
  const remainingTime = Math.max(gameDuration - elapsed, 0); // Keep as number

  if (Number(remainingTime) <= 0) {
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
    : 'http://localhost:3000/images/barbell_up.png'

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
      <Button
        value="click_me"
        // onClick={() => {
        //   score += 1
        //   animationState = !animationState
        // }}
      >
        Click me!
      </Button>,      
    ],
  })
})

// Enable devtools
devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
