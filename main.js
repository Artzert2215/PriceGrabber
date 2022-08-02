const {app, BrowserWindow} = require('electron')
const path = require('path')
const curWindow = false

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
	fullscreen: false,
    webPreferences: {
      webSecurity: false
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false)
  
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({responseHeaders: Object.fromEntries(Object.entries(details.responseHeaders).filter(header => !/x-frame-options/i.test(header[0])))});
  });
  
  curWindow = mainWindow
  mainWindow.once('ready-to-show', () => {
    run()
  })
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('disable-site-isolation-trials')

//code

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
      curWindow.loadURL(url)
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


