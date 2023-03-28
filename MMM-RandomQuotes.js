var self;
Module.register("MMM-RandomQuotes", {
	// Module config defaults.
	defaults: {
		updateInterval: 30000,
		showSymbol: true,
		fadeSpeed: 4000,
		tags: [],
		apiKey: "", // create on paperquotes.com
		quoteSize: "M", // S M L - Default M
		authorSize: "S"	// S M L - Default S 
	},
	quote: "",

	getScripts: function () {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["MMM-RandomQuotes.css", "font-awesome.css"];
	},

	// Override start method.
	start: function () {
		self = this;
		Log.info("Starting module: " + this.name);

		this.lastQuoteIndex = -1;
		this.lastIndexUsed = -1;
		this.quotes = [];

		var data = this.config;
		this.sendSocketNotification("GET_RANDOM_QUOTE", data);
		Log.info("Module " + this.name + ": notification send.");

		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval * 1000);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "GET_RANDOM_QUOTE_RESPONSE") {
			Log.info("New quotes " + payload.length + " received.");
			this.dataNotification = payload;
			payload.forEach(element => {
				//Log.info("New quotes: " + element.quote.replace("\n","").replace(element.author, ""));
				var quoteDetail = { quote: element.quote.replace("\n", "").replace(element.author, ""), author: element.author };
				this.quotes.push(quoteDetail);
			});
			this.updateDom();
		}
	},

	getRandomQuote: function () {

		var index;
		if (this.lastIndexUsed >= this.quotes.length - 1) {
			var data = this.config;
			this.sendSocketNotification("GET_RANDOM_QUOTE", data);
			index = 0;
		}
		index = ++this.lastIndexUsed;

		return this.quotes[index] || "";
	},

	getDom: function () {
		var container = document.createElement("div");
		const wrapper = document.createElement("div");

		var quoteLineDiv = document.createElement('div');
		var quoteFontSize = this.getFontSize(this.config.quoteSize);
		quoteLineDiv.className = "thin bright pre-line " + quoteFontSize;

		var authorLineDiv = document.createElement('div');
		var authorFontSize = this.getFontSize(this.config.authorSize);
		authorLineDiv.className = "thin bright pre-line " + authorFontSize;

		if (this.config.showSymbol) {
			var symbol = document.createElement("span");
			symbol.className = "fa fa-quote-left symbol-quote symbol-quote-left";
			quoteLineDiv.appendChild(symbol);
		}

		var quoteText = this.getRandomQuote();
		var quoteLineSpan = document.createElement('span');
		quoteLineSpan.innerHTML = quoteText.quote;
		quoteLineDiv.appendChild(quoteLineSpan);

		if (this.config.showSymbol) {
			symbol = document.createElement("span");
			symbol.className = "fa fa-quote-right symbol-quote symbol-quote-right";
			quoteLineDiv.appendChild(symbol);
		}
		container.appendChild(quoteLineDiv);

		if (quoteText.author !== "" && quoteText.author !== null && quoteText.author !== undefined && quoteText.author !== "null") {
			var authorLineSpan = document.createElement('span');
			authorLineSpan.innerHTML = quoteText.author;
			authorLineDiv.appendChild(authorLineSpan);
			container.appendChild(authorLineDiv);
		}

		wrapper.innerHTML += container.innerHTML;
		return wrapper;
	},

	getFontSize : function(size){
		if(size == "S")
			return "small";
		if(size == "L")
			return "large";
		else
			return "medium";
	}
});