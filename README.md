# emoji-shift

Welcome to Emoji-Shift! This is a Single Page Application built with Vue.js 3 and TypeScript.

Create simple emoji cards consisting of an array of emojis and optional top and bottom messages. Drag emojis around, randomize them, remove or add new ones. Use the save and load buttons to keep track of your progress and go to the preview page to check how it is turning out. In there you will also find a link that generate the card you have saved. You can copy it and share to whoever you like, and they'll be able to see the same card.

Emojis can be rendered differently whether you are viewing them on Google Chrome, Firefox, Safari and other platforms. The same card will look slightly different depending on the device, but it will always contain the same emojis and messages.

## Technical aspects
Emoji-Shift uses [Vue 3's Composition API](https://v3.vuejs.org/api/composition-api.html) to render and transfer data between components. It also uses a centralized store to keep the available emojis, as well as the card's emojis and messages. There are two sperate states for the card data: one for the saved card, and one for the card currently in-progress. This store is entirely contained within a single reactive object, thanks to [Vue 3's new Reactivity API](https://v3.vuejs.org/api/basic-reactivity.html). Methods for handling the data, as well as URL parsing, are also kept on a centralized file. TypeScript is integrated in all these methods.

[Vue Router](https://github.com/vuejs/vue-router-next) is in place to handle views and the URL query parameters used to share emoji cards. When first accessing Emoji-Shift, either through the card sharing route or the home route, all emojis are parsed from a raw data object and loaded into the store. First accessing the application on the home route also makes a card with 4 random emojis and default messages to be loaded into the editing state, rendereding them to the user.

Any access on the card sharing route will call methods to parse query params from the URL and generate a new card from them. Problems during this process, or accessing this route without the query params, will cause a random card to be loaded. Finally, accessing the Preview route will render the card in the saved state. If no card was saved yet, the view simply informs the user of the fact and invites to do so on the editing area.

The same Vue component is used to render emoji cards in all views. Props and conditional rendering is used to fetch the correct data from the store, and either show or omit the editing controls accordingly.

Emoji-Shift will be kept updated with Vue 3's current stable version. Current plans include the implementation of tests and some revisions.

## Project setup
To run Emoji-Shift locally, simply clone this repository and follow the steps bellow.

### Install dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
