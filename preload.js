const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions123', {
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

contextBridge.exposeInMainWorld('get', {
    x: async () => {
        var result = await ipcRenderer.invoke('getRequest');
    },
})

contextBridge.exposeInMainWorld('post', {
    x: () => ipcRenderer.invoke('postRequest')
})

ipcRenderer.on('gotData', (event, json) => {
    console.log(json);
    const lblResponse = document.getElementById('lblResponse');
    lblResponse.innerText = json;
})