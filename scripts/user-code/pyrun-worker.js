import "https://cdn.jsdelivr.net/npm/pyodide@0.28.2/pyodide.min.js";

let pyodide = await loadPyodide();

let runPython = async (python) => {
    let NAMESPACE = pyodide.globals.get("dict")(); 

    pyodide.setStdin({stdin: () => {
        getInput();
    }});

    let output = '';
    const decoder = new TextDecoder();
    pyodide.setStdout({
        write: (buf) => {
            const str = decoder.decode(buf);
            output += str;
            postMessage({ cmd: "stdout", text: str });
            console.log("got stuff here though");
            return buf.length;
        }
    });
    await pyodide.runPythonAsync(python, { globals: NAMESPACE });

    return output;
}

let awaitPyrun = async (message) => {
    let result = await runPython(message.data.python);
    postMessage(result);
}


const onmessage = async (message) => {
    
    if(message.data.cmd === "awaitPyrun"){
        awaitPyrun(message);
    }
}

self.onmessage = onmessage;


const getInput = async (promptText = "", currentDisplay=null) => {
    
}

