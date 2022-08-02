var urldatabase = [
    ["https://www.autovoorkinderen.nl/mercedes-elektrische-kinderauto-glc-coupe-wit", "method1", "mercedes-elektrische-kinderauto-glc-coupe-wit"], 
	["https://www.bol.com/nl/nl/p/mercedes-elektrische-kinderauto-glc-coupe-wit/9300000040191508/", "method2", "mercedes-elektrische-kinderauto-glc-coupe-wit"],
]

var results = []

function run() {
    for (let i = 0; i < urldatabase.length; i++) {
        var url = urldatabase[i][0]
        var method = urldatabase[i][1]
		var carid = urldatabase[i][2]
        window.location.href = url;
		if (results[carid] == undefined) {
			results[carid] = []
		}
		var price = "error"
		if (method == "method1") {
			document.addEventListener("load", function() {
				price = document.getElementById("price-including-tax-product-price-21519").getAttribute("data-price-amount")
			});
		} else if (method == "method2") {
			document.addEventListener("load", function() {
				price = document.getElementsByClassName("promo-price")[0].innerHTML
			});
		}
		console.log("Price for " + carid + " equals " + price + " euros (" + url + ")")
		results[carid].push([price, url]);
		console.log(results)
    };
}

window.addEventListener('load',() => {
  run()
});

//Nothing better than reading some code and trying to understand it, right?