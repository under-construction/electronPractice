const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versionsaq', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    setTitle: (title) => ipcRenderer.send('set-title123', title),
    fileOpen: () => ipcRenderer.invoke('openFile123')
})

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('getRequest', {
    x: () => ipcRenderer.invoke('getRequest'),
    y: () => ipcRenderer.invoke('logResponse')
})