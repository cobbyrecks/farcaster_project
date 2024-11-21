/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

// Initialize Frog app
const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Lift It!',
});

// Consolidated game state
const gameState = {
  score: 0,
  animationState: false,
  remainingTime: 60, // seconds
  gameStarted: false,
};

// Constants for barbell images
const barbellImages = {
  up: `${process.env.NEXT_PUBLIC_SITE_URL}/images/barbell_up.png`,
  down: `${process.env.NEXT_PUBLIC_SITE_URL}/images/barbell_down.png`,
};

// Helper function to reset the game
const resetGame = () => {
  gameState.score = 0;
  gameState.remainingTime = 60;
  gameState.gameStarted = false;
  gameState.animationState = false;
};

// Start the timer
setInterval(() => {
  if (gameState.gameStarted && gameState.remainingTime > 0) {
    gameState.remainingTime -= 1;
  }
}, 1000);

// Centralized UI styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundColor: '#ffffff',
};

const textStyle = (color = '#000000', marginBottom = '20px') => ({
  color,
  marginBottom,
});

// Render frame
app.frame('/', (c) => {
  const { buttonValue } = c;

  if (buttonValue === 'click_me' && gameState.remainingTime > 0) {
    if (!gameState.gameStarted) {
      gameState.gameStarted = true;
    }
    gameState.score += 1;
    gameState.animationState = !gameState.animationState;
  }

  if (buttonValue === 'reset_me') {
    resetGame();
  }

  if (gameState.remainingTime <= 0) {
    return c.res({
      title: 'Game Over',
      image: (
        <div style={containerStyle}>
          <h1 style={textStyle('#000000')}>Join the $LIFTIT Movement!</h1>
          <h2 style={textStyle('#000000')}>Final Score: {gameState.score}</h2>
        </div>
      ),
      intents: [<Button value="reset_me">Lift Again!</Button>,
        <Button.Redirect location="https://fnliftit.com/Merch.html">Merchandize!</Button.Redirect>,
        <Button.Redirect location="https://fnliftit.com/Trading.html">NFTs!</Button.Redirect>,
        <Button.Redirect location="https://www.dextools.io/app/en/solana/pair-explorer/44DJoy2qbTpRtXZd5BLA9275gJvPoKzDQ6NPCpm7pump">Dextools!</Button.Redirect>
      ],
    });
  }

  return c.res({
    title: 'Lift It!',
    image: (
      <div style={containerStyle}>
        <h3 style={{ ...textStyle('#FF4500', '10px'), fontSize: '40px' }}>
          WHAT ARE YOU LIFTING TODAY?
        </h3>
        <p style={{ ...textStyle('#FF4500', '20px'), fontSize: '34px' }}>
          It doesn't matter! Just $LIFTIT!!!
        </p>
        <h1 style={textStyle('#000000')}>Time: {gameState.remainingTime}s</h1>
        <h2 style={textStyle('#000000')}>Score: {gameState.score}</h2>
        <img
          src={gameState.animationState ? barbellImages.down : barbellImages.up}
          alt="Barbell"
          style={{
            width: '150px',
            height: '150px',
            marginBottom: '20px',
          }}
        />
      </div>
    ),
    intents: [<Button value="click_me">Click to Lift It!</Button>],
  });
});

// Enable devtools
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
