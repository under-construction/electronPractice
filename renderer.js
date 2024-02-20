const btnGet = document.getElementById('btnGet');
btnGet.addEventListener('click', async () => {
    await window.get.x()
});

const btnPost = document.getElementById('btnPost');
btnPost.addEventListener('click', async () => {
    await window.post.x();
});

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions123.chrome()}), Node.js (v${versions123.node()}), and Electron (v${versions123.electron()})`

const func = async () => {
    const response = await window.versions123.ping();
    console.log(response);
}

func();

const inputTitle = document.getElementById('title');
const btnTitleChange = document.getElementById('btnTitleChange');
btnTitleChange.addEventListener('click', () => { window.versions123.setTitle(inputTitle.value) });

const btnOpenFile = document.getElementById('btn');
const filePathElement = document.getElementById('filePath')
btnOpenFile.addEventListener('click', async () => {
    const filePath = await window.versions123.fileOpen();
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