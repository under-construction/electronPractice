const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versionsaq', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    setTitle: (title) => ipcRenderer.send('set-title123', title),
    fileOpen: () => ipcRenderer.invoke('openFile123')
})