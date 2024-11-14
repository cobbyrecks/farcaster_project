/** @jsxImportSource frog/jsx */

import { Button, Frog, Text } from 'frog'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

// Initialize the Frog app
const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Click the Button Game',
});

// Game settings
const gameDuration = 60 * 1000; // Game duration in milliseconds (60 seconds)
const barbellUpImage = '/images/barbell_up.png';
const barbellDownImage = '/images/barbell_down.png';

// Frame setup for the game
app.frame('/', (c) => {
  const { score = 0, startTime = Date.now(), animationState = false } = c;
  
  // Calculate elapsed time and remaining time
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(gameDuration - elapsedTime, 0);
  const isGameOver = remainingTime === 0;

  // Render game UI
  return c.res({
    image: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Display remaining time */}
        <Text style={{ fontSize: 48, color: '#000' }}>
          {`Time: ${Math.floor(remainingTime / 1000)}`}
        </Text>

        {/* Display score */}
        <Text style={{ fontSize: 48, color: '#000' }}>
          {`Score: ${score}`}
        </Text>

        {/* Interactive button */}
        {!isGameOver && (
          <Button
            onClick={() => c.set({ score: score + 1, animationState: !animationState })}
            style={{
              width: 200,
              height: 100,
              fontSize: 24,
              backgroundColor: '#0078D4',
              color: '#FFFFFF',
              margin: '20px',
            }}
          >
            Click Me!
          </Button>
        )}

        {/* Barbell animation */}
        <img
          src={animationState ? barbellDownImage : barbellUpImage}
          alt="barbell"
          style={{ width: 200, height: 200, marginTop: 20 }}
        />

        {/* Display game-over message if time is up */}
        {isGameOver && (
          <Text style={{ fontSize: 36, color: '#000', marginTop: 30 }}>
            {`Game Over! Final Score: ${score}`}
          </Text>
        )}
      </div>
    ),
  });
});

// Enable devtools and serve static assets
serveStatic(app, { assetsPath: '/images' });
export const GET = handle(app);
export const POST = handle(app);
