/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  // const { buttonValue, inputText, status } = c;
  // const fruit = inputText || buttonValue;
  return c.res({
    action: '/clicker',
    image: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#000000',
        }}
      >
        <img
          src="http://localhost:3000/images/barbell_down.png"
          alt="Barbell"
          style={{
            width: '150px', // Reduce size
            height: '150px', // Maintain aspect ratio
          }}
        />
      </div>
    ),
    intents: [
      <Button value="click">Click me!</Button>,
      // <Button value="oranges">Oranges</Button>,
      // <Button value="bananas">Bananas</Button>,
      // status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame('/clicker', (c) => {
  // const { buttonValue, inputText, status } = c;
  // const fruit = inputText || buttonValue;
  const { buttonValue } = c;
  if (buttonValue === 'click'){
    
  }
  return c.res({
    // action: '/clicker',
    image: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#000000',
        }}
      >
        <img
          src="http://localhost:3000/images/barbell_down.png"
          alt="Barbell"
          style={{
            width: '150px', // Reduce size
            height: '150px', // Maintain aspect ratio
          }}
        />
      </div>
    ),
    intents: [
      <Button value="click">Click me!</Button>,
      // <Button value="oranges">Oranges</Button>,
      // <Button value="bananas">Bananas</Button>,
      // status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
