const {app, BrowserWindow} = require('electron')
const path = require('path')
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


