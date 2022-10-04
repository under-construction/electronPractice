const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versionsaq.chrome()}), Node.js (v${versionsaq.node()}), and Electron (v${versionsaq.electron()})`

const func = async () => {
    debugger;
    const response = await window.versionsaq.ping();
    console.log(response);
}

func();