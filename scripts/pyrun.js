window.languagePluginUrl = 'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/';

let pyodide = await loadPyodide();
pyodide.globals.set("input", getInput);

export function runUserCode(code){
    let wrappedCode = makeWrapper(code);
    return pyRun(wrappedCode);
} 

async function simplePyRun(code){
    let output;
    for (let line of code.split("\n")){
        output.push(await pyodide.runPythonAsync(line));
    }
    return output;
}

let makeWrapper = (code) => {
    const wrapper = `
import asyncio
async def SUPERMAIN():
    ${code}
    pass
asyncio.run(SUPERMAIN())
`   ;

    return wrapper;
}



async function pyRun(code){
    try{
        //I need to await jsInput if an input is required before continuing:

        let output = '';
        pyodide.setStdout({batched: (str) => {output += str.endsWith("\n") ? str : str + "\n";}});

        await pyodide.runPythonAsync(code);
        console.log("output: ", output, " wrappedcode = ", code);

        return output;

    }
    catch (error){
        try{
            return await simplePyRun()
        }
        catch{

        console.log("Error running py code: ", error);

        if (error instanceof Error && typeof error.message === "string") {
            const lines = error.message.split('\n');
            const relevantLines = [];

            // Go through lines from bottom up
            for (let i = lines.length - 1; i >= 0; i--) {
                let line = lines[i].trim();
                if (!line) continue;

                // Skip internal Pyodide files except <exec>
                if (line.startsWith('File "/lib/python')) continue;

                // Adjust line numbers for wrapper
                const match = line.match(/line (\d+)/);
                if (match) {
                    const originalLine = parseInt(match[1], 10);
                    const adjustedLine = originalLine - 3; // wrapper lines
                    line = line.replace(`line ${originalLine}`, `line ${adjustedLine}`);
                }

                // Replace <exec> with <python>
                line = line.replace(/<exec>/g, "<python>");

                relevantLines.unshift(line);

                // Stop after capturing the main exception line and one line of context
                if (/^\w+Error:/.test(line) || /^\w+Warning:/.test(line)) break;
            }

            relevantLines.unshift("ERROR! Think carefully, here is a clue:\n\n");
            return relevantLines.join('\n');
        }}
        return "Unknown error - Look around in your code for clues";
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

export async function getTree(code){
    let tree = await pyodide.runPythonAsync(`
        import ast, json

        def ast_to_dict(node):
            if isinstance(node, ast.AST):
                result = {"type": type(node).__name__}
                for field in node._fields:
                    result[field] = ast_to_dict(getattr(node, field))
                return result
            elif isinstance(node, list):
                return [ast_to_dict(n) for n in node]
            else:
                return node

        tree = ast_to_dict(ast.parse("""${code}"""))
        json.dumps(tree)
    `);
    tree = JSON.parse(tree);
    return tree;
}

async function serverRun(code){
    //new code here
}