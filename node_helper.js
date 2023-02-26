const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const Log = require("logger");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node_helper for module: " + this.name);
  },

  getRandomQuote: async function (config) {
    var language = config.language !== undefined ? "&lang=" + config.language : "&lang=en";
    var tags = this.isLanguageEN() && config.tags !== undefined && config.tags.length > 0 ? "&tags=" + config.tags.join() : "";
    var curated = this.isLanguageEN() ? "" : "&curated=1";
    var url = "https://api.paperquotes.com/apiv1/quotes/?limit=100" + curated + language + tags;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: "Token " + config.apiKey
        }
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching quote: ", error);
      return null;
    }
  },

  isLanguageEN: function () {
    var language = config.language !== undefined ? config.language : "en";
    return language == "en";
  },

  socketNotificationReceived: async function (notification, payload) {
    if (notification === "GET_RANDOM_QUOTE") {
      const quote = await this.getRandomQuote(payload);
      this.sendSocketNotification("GET_RANDOM_QUOTE_RESPONSE", quote);
    }
  }
});
