//pyrun.js 
//make sure <script src="https://cdn.jsdelivr.net/npm/pyodide@0.28.2/pyodide.min.js"></script> is in html
//this is for running user code, user side
window.languagePluginUrl = 'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/';

let pyodide = null;
async function initPyodide(){
    pyodide = await loadPyodide();
    
    // register it so Python sees it as "input"
    pyodide.globals.set("input", getInput);


}
initPyodide();

export function runUserCode(code){
    return pyRun(code);
} 

async function pyRun(code){
    try{
        console.log('run');

        //I need to await jsInput if an input is required before continuing:

        const asyncCode = addAwaitToInput(code);


        let output = '';
        pyodide.setStdout({batched: (str) => {output += str.endsWith("\n") ? str : str + "\n";}});

        await pyodide.runPythonAsync(`
import asyncio
async def main():
    ${asyncCode.replace(/\n/g, '\n    ')}
asyncio.run(main())
        `);

        console.log('ran with result: ' + output);
        return output;

    }
    catch (error){
        console.log("Error running py code: ", error);
        return error;
    }
    console.log("the impossible just happened!!!? (uhm talk to a developer RN this is weird)")
    return false;
}

function getInput(promptText = ""){



    if(window.currentDisplay.output) {
        window.currentDisplay.output.value += promptText;
        window.currentDisplay.output.value += "\n";
    }

    console.log(window.currentDisplay);
    console.log("gonna get input");

    return window.currentDisplay.getInput();
}

function addAwaitToInput(code) {
    // This will replace all standalone input( with await input(
    // Note: naive, will break if input is inside strings or comments
    return code.replace(/\binput\s*\(/g, 'await input(');
}

