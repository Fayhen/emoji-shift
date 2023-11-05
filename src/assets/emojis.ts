import type { AllEmojis, RawEmojiData, ValidCategories, ValidCodepoints } from '@/models/emojis'

// Commented-out emojis were added post 2018 and will not
// properly render on outdated but fairly new devices
const emojis: RawEmojiData = {
  hearts: {
    0x1f5a4: 'Black heart',
    0x1f9e1: 'Orange heart',
    0x1f48c: 'Heart envelope',
    0x1f49a: 'Green heart',
    0x1f49b: 'Yellow heart',
    0x1f49c: 'Purple heart',
    0x1f49d: 'Heart with ribbon',
    0x1f49e: 'Revolving hearts',
    0x1f493: 'Beating heart',
    0x1f495: 'Two hearts',
    0x1f496: 'Sparkling heart',
    0x1f497: 'Growing heart',
    0x1f498: 'Heart with arrow',
    0x1f499: 'Blue heart',
    0x2763: 'Heart exclamation',
    0x2764: 'Red heart'
    // [0x1F90E, "Brown heart"],
    // [0x1F90D, "White heart"],
  },
  flowers: {
    0x1f3f5: 'Rosette',
    0x1f4ae: 'White flower',
    0x1f33a: 'Hibiscus',
    0x1f33b: 'Sunflower',
    0x1f33c: 'Blossom',
    0x1f337: 'Tulip',
    0x1f338: 'Cherry blossom',
    0x1f339: 'Rose',
    0x1f490: 'Bouquet'
  },
  animals: {
    0x1f40a: 'Crocodile',
    0x1f40b: 'Whale',
    0x1f40c: 'Snail',
    0x1f40d: 'Snake',
    0x1f40e: 'Horse',
    0x1f40f: 'Ram',
    0x1f41a: 'Sea shell',
    0x1f41b: 'Caterpillar',
    0x1f41c: 'Ant',
    0x1f41d: 'Honeybee',
    0x1f41e: 'Ladybug',
    0x1f41f: 'Fish',
    0x1f42a: 'Dromedarian camel',
    0x1f42b: 'Bactrian camel',
    0x1f42c: 'Dolphin',
    0x1f43a: 'Wolf',
    0x1f43b: 'Bear',
    0x1f43c: 'Panda',
    0x1f43f: 'Chipmunk',
    0x1f54a: 'Dove',
    0x1f98a: 'Fox',
    0x1f98b: 'Butterfly',
    0x1f98c: 'Deer',
    0x1f98d: 'Gorilla',
    0x1f98e: 'Gecko',
    0x1f98f: 'Rhinoceros',
    0x1f400: 'Rat',
    0x1f401: 'Mouse',
    0x1f402: 'Ox',
    0x1f403: 'Water buffalo',
    0x1f404: 'Cow',
    0x1f405: 'Tiger',
    0x1f406: 'Leopard',
    0x1f407: 'Rabbit',
    0x1f408: 'Cat',
    0x1f410: 'Goat',
    0x1f411: 'Sheep',
    0x1f412: 'Monkey',
    0x1f413: 'Rooster',
    0x1f414: 'Chicken',
    0x1f415: 'Dog',
    0x1f416: 'Pig',
    0x1f417: 'Boar',
    0x1f418: 'Elephant',
    0x1f419: 'Octopus',
    0x1f420: 'Tropical fish',
    0x1f421: 'Blowfish',
    0x1f422: 'Turtle',
    0x1f423: 'Hatching chick',
    0x1f424: 'Baby chick',
    0x1f426: 'Bird',
    0x1f427: 'Penguim',
    0x1f428: 'Koala',
    0x1f429: 'Poodle',
    0x1f433: 'Spouting whale',
    0x1f438: 'Frog',
    0x1f439: 'Hamster',
    0x1f577: 'Spider',
    0x1f578: 'Spider web',
    0x1f980: 'Crab',
    0x1f981: 'Lion',
    0x1f982: 'Scorpion',
    0x1f983: 'Turkey',
    0x1f984: 'Unicorn',
    0x1f985: 'Eagle',
    0x1f986: 'Duck',
    0x1f987: 'Bat',
    0x1f988: 'Shark',
    0x1f989: 'Owl',
    0x1f990: 'Shrimp',
    0x1f991: 'Squid',
    0x1f992: 'Giraffe',
    0x1f993: 'Zebra',
    0x1f994: 'Hedgehog',
    0x1f997: 'Cricket'
    // ["0x1F9AE", "Guide dog"],
    // ["0x1F415", "Service dog"],
    // ["0x1F99D", "Raccoon"],
    // ["0x1F9A5", "Sloth"],
    // ["0x1F9A7", "Orangutan"],
    // ["0x1F999", "Lhama"],
    // ["0x1F99B", "Hippopotamus"],
    // ["0x1F9A6", "Otter"],
    // ["0x1F9A8", "Skunk"],
    // ["0x1F998", "Kangaroo"],
    // ["0x1F9A1", "Badger"],
    // ["0x1F9A2", "Swan"],
    // ["0x1F9A9", "Flamingo"],
    // ["0x1F99A", "Peacock"],
    // ["0x1F99C", "Parrot"],
    // ["0x1F99E", "Lobster"],
    // ["0x1F99F", "Mosquito"],
  },
  fruits: {
    0x1f34a: 'Orange',
    0x1f34b: 'Lemon',
    0x1f34c: 'Banana',
    0x1f34d: 'Pineapple',
    0x1f34e: 'Red apple',
    0x1f34f: 'Green apple',
    0x1f95d: 'Kiwi',
    0x1f345: 'Tomato',
    0x1f347: 'Grapes',
    0x1f348: 'Melon',
    0x1f349: 'Watermelon',
    0x1f350: 'Pear',
    0x1f351: 'Peach',
    0x1f352: 'Cherries',
    0x1f353: 'Strawberry',
    0x1f951: 'Avocado',
    0x1f965: 'Coconut'
    // ["0x1F96D", "Mango"],
  },
  food: {
    0x1f9c0: 'Cheese',
    0x1f32d: 'Hot dog',
    0x1f32e: 'Taco',
    0x1f32f: 'Burrito',
    0x1f35a: 'Cooked rice',
    0x1f35b: 'Curry',
    0x1f35c: 'Noodles',
    0x1f35d: 'Spaghetti',
    0x1f35e: 'Bread',
    0x1f35f: 'French fries',
    0x1f36a: 'Cookie',
    0x1f36b: 'Chocolate bar',
    0x1f36e: 'Custard',
    0x1f36f: 'Honey pot',
    0x1f37d: 'Fork and knife with plate',
    0x1f37f: 'Popcorn',
    0x1f95b: 'Milk glass',
    0x1f95e: 'Pancakes',
    0x1f95f: 'Dumpling',
    0x1f96a: 'Sandwich',
    0x1f96b: 'Canned food',
    0x1f354: 'Hamburger',
    0x1f355: 'Pizza',
    0x1f358: 'Rice cracker',
    0x1f359: 'Onigiri',
    0x1f360: 'Roasted sweet potato',
    0x1f361: 'Dango',
    0x1f362: 'Oden',
    0x1f363: 'Sushi',
    0x1f364: 'Fried shrimp',
    0x1f365: 'Fishcake',
    0x1f366: 'Soft ice cream',
    0x1f367: 'Shaved ice',
    0x1f368: 'Ice cream',
    0x1f369: 'Donut',
    0x1f370: 'Shortcake',
    0x1f371: 'Bento box',
    0x1f372: 'Soup',
    0x1f374: 'Fork and knife',
    0x1f375: 'Tea',
    0x1f382: 'Birthday cake',
    0x1f944: 'Spoon',
    0x1f950: 'Croissant',
    0x1f953: 'Bacon',
    0x1f956: 'Baguette',
    0x1f957: 'Green salad',
    0x1f958: 'Paella',
    0x1f959: 'Doner kebab',
    0x1f960: 'Fortune cookie',
    0x1f961: 'Takeout box',
    0x1f962: 'Chopsticks',
    0x1f967: 'Pie',
    0x1f968: 'Pretzel',
    0x2615: 'Coffee'
    // ["0x1F96F", "Bagel"],
    // ["0x1F9C7", "Waffle"],
    // ["0x1F9C2", "Salt"],
    // ["0x1F96E", "Mooncake"],
    // ["0x1F9C1", "Cupcake"],
  },
  astra: {
    0x1f4e1: 'Satellite antenna',
    0x1f6f0: 'Satellite',
    0x1f6f8: 'Flying sauce',
    0x1f30c: 'Milky way',
    0x1f30d: 'Globe showing Europe-Africa',
    0x1f30e: 'Globe showing Americas',
    0x1f30f: 'Globe showing Asia-Australia',
    0x1f31a: 'Smiley new moon',
    0x1f31b: 'Smiley first quarter moon',
    0x1f31c: 'Smiley last quarter moon',
    0x1f31d: 'Smiley full moon',
    0x1f31e: 'Smiley sun',
    0x1f31f: 'Glowing star',
    0x1f52d: 'Telescope',
    0x1f303: 'Starry night',
    0x1f310: 'Globe with meridians',
    0x1f311: 'New moon',
    0x1f312: 'Waxing crescent moon',
    0x1f313: 'First quarter moon',
    0x1f314: 'Waxing gibbous moon',
    0x1f315: 'Full moon',
    0x1f316: 'Waning gibbous moon',
    0x1f317: 'Last quarter moon',
    0x1f318: 'Waning crescent moon',
    0x1f319: 'Crescent moon',
    0x1f320: 'Shooting star',
    0x1f680: 'Rocket',
    0x2b50: 'Star',
    0x2600: 'Sun',
    0x2604: 'Comet'
  }
}

// Return array of codepoints for a given category
/**
 * Gets emojis from a given category.
 *
 * @param category Category to get.
 * @returns Array of emoji codepoints.
 */
export const getCategory = (category: ValidCategories): ValidCodepoints[] => {
  return Object.keys(emojis[category]).map((key) => Number(key))
}

/**
 * Gets an array of available emoji categories.
 *
 * @returns Array of emoji categories.
 */
export const categoryNames = (): ValidCategories[] => {
  return Object.keys(emojis)
}

/**
 * Parses all emojis is an object ready for use on the application
 * state.
 *
 * @returns Emojis data.
 */
export const retrieveAll = () => {
  const categories = categoryNames()

  return categories.reduce((acc, category) => {
    const codepoints = getCategory(category)

    const emojisOnCategory = codepoints.reduce((acc, codepoint) => {
      const emoji = {
        category,
        label: emojis[category][codepoint]
      }
      return { ...acc, [codepoint]: emoji }
    }, {})

    return { ...acc, ...emojisOnCategory }
  }, {} as AllEmojis)
}
