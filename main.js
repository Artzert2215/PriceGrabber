const {app, BrowserWindow} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
var curWindow = false

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
	fullscreen: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      webSecurity: false,
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: true,
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false)
  
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({responseHeaders: Object.fromEntries(Object.entries(details.responseHeaders).filter(header => !/x-frame-options/i.test(header[0])))});
  });
  
  
  curWindow = mainWindow
  mainWindow.webContents.once('did-finish-load', () => {
    console.log("ready to run script")
    run(0)
  });
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

function sendJS(js) {
  curWindow.webContents.executeJavaScript(js)
}

/*
sites with their methods
autovoorkinderen.nl -> 1
bol.com -> 2
omidbikes.nl -> 3
*/

var urldatabase = [
  //mercedes-elektrische-kinderauto-glc-coupe-wit
  ["https://www.autovoorkinderen.nl/mercedes-elektrische-kinderauto-glc-coupe-wit", "method1", "mercedes-elektrische-kinderauto-glc-coupe-wit"], 
  ["https://www.bol.com/nl/nl/p/mercedes-elektrische-kinderauto-glc-coupe-wit/9300000040191508/", "method2", "mercedes-elektrische-kinderauto-glc-coupe-wit"],
  ["https://omidbikes.nl/product/kindervoertuigen/kinderaccu-auto/mercedes-benz/mercedes-benz-glc-63s-2-persoons-wit-12v-mp4-tv-leder/", "method3", "mercedes-elektrische-kinderauto-glc-coupe-wit"],
]

var results = []
var curi = 0

function run(num) {
  i = num
  var url = urldatabase[i][0]
  var method = urldatabase[i][1]
  var carid = urldatabase[i][2]
  curWindow.loadURL(url)
  if (results[carid] == undefined) {
    results[carid] = []
  }
  
  
  curWindow.webContents.once('did-finish-load', () => {
    //obtain price
    if (method == "method1") {
      sendJS(
        `price = document.getElementsByClassName("price-including-tax")[0].getAttribute("data-price-amount");
        console.log(price);
        window.api.send("price-upd", price);`
      )
    } else if (method == "method2") {
      sendJS(
        `price = document.getElementsByClassName("promo-price")[0].textContent;
        console.log(price);
        window.api.send("price-upd", price);`
      )
    } else if (method == "method3") {
      sendJS(
        `
        function findclass(classNamel, collection) {
          var elementsArray = [].slice.call(collection);
          for (var index = 0; index < elementsArray.length; index++) {
            var element = elementsArray[index];
            if (element.className == classNamel) {
              return element;
            }
          }
          return null;
        }

        var papa = document.getElementsByClassName("entry-summary")[0]
        var children = papa.children;
        var chosenone = findclass("price", children)
        price = chosenone.textContent.substring(1);
        console.log(price);
        window.api.send("price-upd", price);`
      )
    }
    //await response now
  });
}

ipcMain.on('price-upd', (event, arg) => {
  var i=curi
  price = parseInt(arg)
  var url = urldatabase[i][0]
  var carid = urldatabase[i][2]

  console.log("Price for " + carid + " equals " + price + " euros (" + url + ")")
  results[carid].push([price, url]);

  //finish up
  setTimeout(() => {
    if (i+1 < urldatabase.length) {
      run(i+1)
      curi = i+1
    } else {
      console.log("finished task")
    }
  }, "250")
})