const { app, BrowserWindow, ipcMain, dialog, nativeTheme, net } = require('electron')
const path = require('path')

let responseData;

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

    ipcMain.handle('getRequest', () => {
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
     
            response.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`)
                responseData = chunk
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
    })

    ipcMain.handle('postRequest', () => {
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
    })

    ipcMain.handle('logResponse', handleLogResponse)

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

async function handleLogResponse() {
    let json = responseData.toJSON();
    let josinify = JSON.parse(responseData);
    return await responseData.toString();
}

app.whenReady().then(() => {
    ipcMain.on('set-title123', handleSetTitle);
    ipcMain.handle('openFile123', handleFileOpen);
    // ipcMain.handle('logResponse', handleLogResponse)
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log("ercu");
        app.quit();
    }
  })