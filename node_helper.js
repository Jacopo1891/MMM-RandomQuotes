const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start () {
		console.log(`Starting node_helper for module: ${this.name}`);
	},

	async getRandomQuote (config) {
		var category = config.category !== undefined && config.category !== "" ? `?category=${config.category}` : "";
		var url = `https://api.api-ninjas.com/v1/quotes${category}`;
		try {
			const response = await fetch(url, {
				headers: { "X-Api-Key": config.apiKey }
			});
			const data = await response.json();
			if (data.length == 0) console.error(`Module ${this.name}: 0 quotes received.`);
			return data;
		} catch (error) {
			console.error("Error fetching quote: ", error);
			return null;
		}
	},

	async socketNotificationReceived (notification, payload) {
		if (notification === "GET_RANDOM_QUOTE") {
			const quote = await this.getRandomQuote(payload);
			this.sendSocketNotification("GET_RANDOM_QUOTE_RESPONSE", quote);
		}
	}
});
