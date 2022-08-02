var desingver = 49
var latestVersion = 0
setTimeout("rpage()", "3600000");

function mainip() {
console.log("Initializing Infonet Power...");
var cssLink = document.createElement("link");
cssLink.href = "cust1.css"; 
cssLink.rel = "stylesheet"; 
cssLink.type = "text/css"; 
document.getElementById("gwd-iframe_2").style.display = "none";
var test = document.getElementById("gwd-iframe_1").contentWindow.document
console.log(test.getElementsByTagName("title").item(0).innerHTML)
if (test.getElementsByTagName("title").item(0).innerHTML == "Witte Lessen") {
    console.log(test.getElementsByTagName("style").item(0))
    test.getElementsByTagName("style").item(0).innerHTML = "body { text-align: center; padding: 150px; background-color: #000000;} h1 { font-family: Ubuntu; font-size: 50px; } body { font-family: Ubuntu; font-size: 20px; color: #FFFFFF; } article { display: block; text-align: center; width: 100%; margin: 0 auto; } a { color: #dc8100; text-decoration: none; } a:hover { color: #333; text-decoration: none; }"
}
gettime()
start()
}

function gettime() {
var uur = document.getElementById("uur");
var extra = document.getElementById("extra");
var d = new Date();
var th = d.getHours();
var tm = d.getMinutes();
var day = d.getDate();
var month = d.getMonth();
var months = new Array('Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December');
updoot = "You shouldn't see this, ever..."
if (latestVersion == desingver) {
    updoot = "V"+latestVersion.toString()+" ✓"
}
else if (latestVersion > desingver) {
    updoot = "V"+latestVersion.toString()+" ✗"
}
else if (latestVersion == 0) {
    updoot = "No Network"
}
else if (latestVersion !== 0 && latestVersion < desingver) {
    updoot = "DevBuild"
}

if(th<10) {
	th = '0'+th.toString();
}
if(tm<10) {
	tm = '0'+tm.toString();
}
uur.innerHTML = th+":"+tm;
extra.innerHTML =  day.toString()+" "+months[month]+"\n<br>\n"+updoot;
setTimeout(gettime, "1000");
}

function rpage() {
    console.log("INPO:Reloading Page...");
    location.reload();
}

//Nothing better than reading some code and trying to understand it, right?