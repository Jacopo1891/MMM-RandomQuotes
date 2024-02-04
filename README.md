# Module: Random quotes

A module for the MagicMirror that displays random quote from various authorship using API Ninjas's api.

## Installation

Navigate into your MagicMirror's ~/MagicMirror/modules folder and execute git clone <https://github.com/Jacopo1891/MMM-RandomQuotes>

## Get API Ninjas's api key

Go to <https://api-ninjas.com> and create a new account. Today (2024/02/04), the free subscription allows you to make 10000 calls every month.

## Using the module

To use this module, add it to the modules array in the config/config.js file:

```JavaScript
let config = {
    modules: [
        {
            module: 'MMM-RandomQuotes',
            position: 'bottom_center',
            config: {
                apiKey: 'YOUR_KEY',
                category: "",
                updateInterval: 60,
                showSymbol: true,
                fadeSpeed: 4000,
                quoteSize: "M", // S M L - Default M
                authorSize: "S" // S M L - Default S
            },
        }
    ]
}
```

- apiKey = your api-ninjas.com key as described in the relevant section of this readme
- category = You can filter quotes by category, if is not in this list will not work. [age, alone, amazing, anger, architecture, art, attitude, beauty, best, birthday, business, car, change, communication, computers, cool, courage, dad, dating, death, design, dreams, education, environmental, equality, experience, failure, faith, family, famous, fear, fitness, food, forgiveness, freedom, friendship, funny, future, god, good, government, graduation, great, happiness, health, history, home, hope, humor, imagination, inspirational, intelligence, jealousy, knowledge, leadership, learning, legal, life, love, marriage, medical, men, mom, money, morning, movies, success]
- updateInterval = Update interval in seconds. (default 1 minute)
- showSymbol = true or false, show or hide apex symbol around quote.
- fadeSpeed = How fast (in milliseconds) to fade out and back in when changing quotes.
- quoteSize = Set the quote's font size (small, medium, large)
- authorSize = Set the author's font size (small, medium, large)

## Example Screenshot

- With symbol

![Screenshot with symbol](screen/01-quote_apex.png)

- Without symbol

![Screenshot without symbol](screen/02-quote_without_apex.png)

## Suggestions

Please feel free to raise an issue on GitHub for any features you would like to see or usage issues you experience and I will endeavour to address them.

## Buy me a coffee

Find it useful? Please consider buying me or other contributors a coffee.

<a href="https://www.buymeacoffee.com/jacopo1891d">
<img style="height: 51px; width: 181px; max-width: 100%;" alt="blue-button" src="https://github.com/Jacopo1891/MMM-GoogleTrafficTimes/assets/5861330/43f41b8d-13e5-4711-877d-cab090bc56b0">
</a>
