const { app, BrowserWindow, ipcMain, dialog, nativeTheme, net } = require('electron')
const path = require('path')

var win;
const createWindow = () => {
    win = new BrowserWindow({
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

async function handleLogResponse() {
    let jsonData = JSON.parse(responseData);
    return await responseData.toString();
}

async function getRequest() {
    const request = net.request({
        method: 'GET',
        protocol: 'https:',
        hostname: 'localhost',
        port: 7020,
        path: '/api/User',
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log("***************")
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        console.log("***************")
        let responseData = [];

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            responseData = chunk;
        });

        response.on('end', () => {
            win.webContents.send('gotData', responseData.toString());
        });
    });
    request.on('finish', () => {
        console.log("***************")
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log("***************")
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log("***************")
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', () => {
        console.log("***************")
        console.log('Last Transaction has occurred')
    });
    request.setHeader('Content-Type', 'application/json');
    request.end();
}

async function postRequest() {
    var body = JSON.stringify({ name: 'Gorkem' });
    const request = net.request({
        method: 'POST',
        protocol: 'https:',
        hostname: 'localhost',
        port: 7020,
        path: '/api/User'
    });
    request.on('finish', () => {
        console.log("***************")
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log("***************")
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log("***************")
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', () => {
        console.log("***************")
        console.log('Last Transaction has occurred')
    });
    request.setHeader('Content-Type', 'application/json');
    request.write(body, 'UTF-8');
    request.end();
}

app.whenReady().then(() => {
    ipcMain.on('set-title123', handleSetTitle);
    ipcMain.handle('openFile123', handleFileOpen);
    ipcMain.handle('logResponse', handleLogResponse);
    ipcMain.handle('getRequest', getRequest);
    ipcMain.handle('postRequest', postRequest);
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log("ercu");
        app.quit();
    }
  })