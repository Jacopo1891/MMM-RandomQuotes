# Update: OBSOLETE
Paperquote's api stop working. Use branch master.

# Module: Random quotes
A module for the MagicMirror that displays random quote from various authorship using Paperquote's api.

# Installation
Navigate into your MagicMirror's ~/MagicMirror/modules folder and execute git clone https://github.com/Jacopo1891/MMM-RandomQuotes.git

# Get Paperquote's api key
Go to https://paperquotes.com/ and create a new account. At this time, the free subscription allows you to make 500 calls a day.

# Using the module
To use this module, add it to the modules array in the config/config.js file:
```
var config = {
    modules: [
        {
            module: 'MMM-RandomQuotes',
            position: 'lower_third',
            config: {
                apiKey: 'YOUR_KEY',
                language: 'en',
                tags: [],
                updateInterval: 30,
                showSymbol: true,
                fadeSpeed: 4000,
                quoteSize: "M", // S M L - Default M
		authorSize: "S"	// S M L - Default S 
            },
        }
    ]
}
```
* apiKey = your paperquotes key as described in the relevant section of this readme
* language = Default is english (paperquote's data are completed) [en, it, fr, de, pt, ru, es, tr, uk, he, ar, be, te]. Tested with english and italian.
* tags = You can filter quotes by tags if language is english otherwise is ignored. ["calling", "money", "passion", "joblessness", "kingdom", "opportunities", "principles", "serving-god", "love", "purpose", "jobless", "people", "values", "worship", "life", "employment", "work", "service", "time", "god", "destiny"]
* updateInterval = Update interval in seconds.
* showSymbol = true or false, show or hide apex symbol around quote.
* fadeSpeed = How fast (in milliseconds) to fade out and back in when changing quotes.
* quoteSize = Set the quote's font size (small, medium, large)
* authorSize = Set the author's font size (small, medium, large)

# Example Screenshot
* With symbol

![alt text](https://github.com/Jacopo1891/MMM-RandomQuotes/blob/master/screen/01-quote_apex.png)

* Without symbol

![alt text](https://github.com/Jacopo1891/MMM-RandomQuotes/blob/master/screen/02-quote_without_apex.png)

# Suggestions
Please feel free to raise an issue on GitHub for any features you would like to see or usage issues you experience and I will endeavour to address them.

# Buy me a coffee
Find it useful? Please consider buying me or other contributors a coffee.

<a href="https://www.buymeacoffee.com/jacopo1891d">
<img style="height: 51px; width: 181px; max-width: 100%;" alt="blue-button" src="https://github.com/Jacopo1891/MMM-GoogleTrafficTimes/assets/5861330/43f41b8d-13e5-4711-877d-cab090bc56b0">
</a>
