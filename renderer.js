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