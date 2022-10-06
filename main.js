const { app, BrowserWindow, ipcMain, dialog, nativeTheme } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.handle('ping', () => 'pong');

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        }
        else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })
    
    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    win.loadFile('index.html')
    // win.loadURL('https://google.com')

    // const contents = win.webContents
    // console.log(contents)
}

function handleSetTitle(event, title) {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {
        return
    }
    else {
        return filePaths[0]
    }
}

app.whenReady().then(() => {
    ipcMain.on('set-title123', handleSetTitle);
    ipcMain.handle('openFile123', handleFileOpen);
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log("ercu");
        app.quit();
    }
  })