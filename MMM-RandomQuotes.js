var self;
Module.register("MMM-RandomQuotes", {
	// Module config defaults.
	defaults: {
		updateInterval: 60,
		showSymbol: true,
		fadeSpeed: 4000,
		category: "",
		apiKey: "", // create on API Ninjas
		quoteSize: "M", 	// S M L - Default M
		authorSize: "S",	// S M L - Default S
		maxQuoteLenght: 180	// Max number of quote's characters
	},

	getScripts () {
		return ["moment.js"];
	},

	getStyles () {
		return ["MMM-RandomQuotes.css", "font-awesome.css"];
	},

	// Override start method.
	start () {
		self = this;
		Log.info(`Starting module: ${this.name}`);

		this.lastQuoteIndex = -1;
		this.lastIndexUsed = -1;
		this.quotes = [];

		this.downloadQuoteFromService();
		Log.info(`Module ${this.name}: notification send.`);

		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval * 1000);
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "GET_RANDOM_QUOTE_RESPONSE") {
			if (payload.length == 0) {
				console.error(`Module ${this.name}: 0 quotes received.`);
				return;
			}

			var quoteDetail = { quote: payload[0].quote.replace("\n", "").replace(payload[0].author, ""), author: payload[0].author };
			if(quoteDetail.quote.length <= this.config.maxQuoteLenght) {
				this.quotes.push(quoteDetail);
				this.updateDom();
			}
			else{
				Log.info(`Module ${this.name}: quote length is ${quoteDetail.quote.length} and exceed max lenght. Look for another.`);
				this.downloadQuoteFromService();
			}
		}
	},

	getRandomQuote () {
		this.lastIndexUsed++;
		if (this.lastIndexUsed == this.quotes.length) {
			this.downloadQuoteFromService ();
			this.lastIndexUsed = this.quotes.length - 1;
			if (this.quotes.length == 9000) this.lastIndexUsed = 0;
		}
		return this.quotes[this.lastIndexUsed] || "";
	},

	downloadQuoteFromService () {
		var data = this.config;
		this.sendSocketNotification("GET_RANDOM_QUOTE", data);
	},

	getDom () {
		var container = document.createElement("div");
		const wrapper = document.createElement("div");

		var quoteLineDiv = document.createElement("div");
		var quoteFontSize = this.getFontSize(this.config.quoteSize);
		quoteLineDiv.className = `thin bright pre-line ${quoteFontSize}`;

		var authorLineDiv = document.createElement("div");
		var authorFontSize = this.getFontSize(this.config.authorSize);
		authorLineDiv.className = `thin bright pre-line ${authorFontSize}`;

		if (this.config.showSymbol) {
			var symbol = document.createElement("span");
			symbol.className = "fa fa-quote-left symbol-quote symbol-quote-left";
			quoteLineDiv.appendChild(symbol);
		}

		var quoteText = this.getRandomQuote();
		var quoteLineSpan = document.createElement("span");
		quoteLineSpan.innerHTML = quoteText.quote;
		quoteLineDiv.appendChild(quoteLineSpan);

		if (this.config.showSymbol) {
			symbol = document.createElement("span");
			symbol.className = "fa fa-quote-right symbol-quote symbol-quote-right";
			quoteLineDiv.appendChild(symbol);
		}
		container.appendChild(quoteLineDiv);

		if (quoteText.author !== "" && quoteText.author !== null && quoteText.author !== undefined && quoteText.author !== "null") {
			var authorLineSpan = document.createElement("span");
			authorLineSpan.innerHTML = quoteText.author;
			authorLineDiv.appendChild(authorLineSpan);
			container.appendChild(authorLineDiv);
		}

		wrapper.innerHTML += container.innerHTML;
		return wrapper;
	},

	getFontSize (size) {
		if (size == "S") return "small";
		if (size == "L") return "large";
		else return "medium";
	}
});
