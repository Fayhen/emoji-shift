# emoji-shift

Welcome to Emoji-Shift! This is a Single Page Application built with Vue.js 3 and TypeScript.

Create simple emoji cards consisting of an array of emojis and optional top and bottom messages. Drag emojis around, randomize them, remove or add new ones. Use the save and load buttons to keep track of your progress and go to the preview page to check how it is turning out. In there you will also find a link that generate the card you have saved. You can copy it and share to whoever you like, and they'll be able to see the same card.

Emojis can be rendered differently whether you are viewing them on Google Chrome, Firefox, Safari and other platforms. The same card will look slightly different depending on the device, but it will always contain the same emojis and messages.

## Technical aspects

This application is built with  [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/). It was originally built when the Vue 3 Composition API was on a early release stage as a practical experiment, with Webpack and a simple reactive store.

This store consisted of a single reactive object that has since been replaced by a [Pinia](https://pinia.vuejs.org/) store. It keeps two separate emoji states: a staging state that is mutated directly by the user and a saved state that is kept separately and updated at specific times. The store contains all methods for handling the card contents and generating share URLs.

The card will be initialized with random emojis and predefined messages on initial render. If accessing the applications through a card URL, however, the corresponding emojis and messages will be loaded from the query string parameters. The user can then view the shared card and be able to edit it, or create a new one.


## Project setup
To run Emoji-Shift locally, simply clone this repository and follow the steps bellow.

### Install dependencies

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
