const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versionsaq', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})