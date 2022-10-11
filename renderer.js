const btnGet = document.getElementById('btnGet');
const btnPrint = document.getElementById('btnPrint');
const lblResponse = document.getElementById('lblResponse');
btnGet.addEventListener('click', async () => {
    await window.getRequest.x()
    // const responseString = await window.getRequest.y()
    // lblResponse.innerText = 'responseString';
});
btnPrint.addEventListener('click', async () => {
    let responseString = await window.getRequest.y();   
    let json = JSON.parse(responseString);
    lblResponse.innerText = responseString
})

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versionsaq.chrome()}), Node.js (v${versionsaq.node()}), and Electron (v${versionsaq.electron()})`

const func = async () => {
    const response = await window.versionsaq.ping();
    console.log(response);
}

func();

const inputTitle = document.getElementById('title');
const btnTitleChange = document.getElementById('btnTitleChange');
btnTitleChange.addEventListener('click', () => { window.versionsaq.setTitle(inputTitle.value) });

const btnOpenFile = document.getElementById('btn');
const filePathElement = document.getElementById('filePath')
btnOpenFile.addEventListener('click', async () => {
    const filePath = await window.versionsaq.fileOpen();
    filePathElement.innerText = filePath;
});

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})