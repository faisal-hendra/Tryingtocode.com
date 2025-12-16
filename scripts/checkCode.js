import { getTree } from "./pyrun.js";


const BLANK = '*';

export let normalizeText = (text) => { /* make text similar to allow flexible player input */
    return text.toLowerCase().replaceAll(" ", "").replaceAll("'", `"`);
}

export let checkInclusion = (parts, whole, oppositeParts='*') => {
    let expectsValue = whole !== BLANK && whole !== "";
    if((expectsValue && parts == undefined)) {return false;}
    if(whole === BLANK){ return null; }

    if(whole === '**') { /* any */ 
        if (parts == ""){
            console.log('this is true if it has nothing');
            return null;
        }
        return false;
    }

    const partsSplit = '\n';
    let pass;
    const allParts = parts.split(partsSplit);
    let skips = [];
    skips.length = 0;
    const splitWhole = whole.split("&&&");

    for (let index = 0; index < splitWhole.length; index++) {
        const element = splitWhole[index];
        pass = false;
        console.log(skips, parts);
        for(let part = 0; part < allParts.length; part++){
            if (skips.includes(part)){
                continue;
            }
            let currentPart = allParts[part];
            if(
                normalizeText(currentPart).includes(normalizeText(element)) && 
                currentPart != ""
            )
            {
                console.log(skips, currentPart);
                pass = true;
                skips.push(part);
                break;
            }
        }
        if(pass == false){ break;}
    }
    console.log("passed ", pass);
    return pass;
}

export let isCorrectCode = async (code, json, output) => {
    console.log("the error could be here. Here are a ton of paramaters to be looking at:", code, json, output);
    let tree = await getTree(code);

    let Output = [json['output-includes'], json['output-discludes']];
    let Code = [json['code-includes'], json['code-discludes']];

    console.log(code, tree);

    let OutpuIncluded = checkInclusion(output, Output[0], Output[1]);
    let OutpuDiscluded = !checkInclusion(output, Output[1], Output[0]);
    let CodeIncluded = checkInclusion(code, Code[0], Code[1]);
    let CodeDiscluded = !checkInclusion(code, Code[1], Code[0]);

    let result = true;
    [OutpuIncluded, OutpuDiscluded, CodeIncluded, CodeDiscluded].forEach(element => {
        console.log(element);
        if(element === false){
            result = false;
        }
    });

    return result;
}