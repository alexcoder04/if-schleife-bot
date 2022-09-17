import piston from "piston-client";
import { Logger } from "./Logger.js";

const PISTON_SERVER = "https://emkc.org";

const lg = new Logger("CodeExecutor");
const client = piston({ server: PISTON_SERVER });

export async function listRuntimes(){
    try {
        return await client.runtimes();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function runCode(code, language){
    try {
        const res = await client.execute(language, code);
        if (!("run" in res)) {
            return `ERROR: Piston returned: ${res.message}`;
        }
        return res.run.output;                           
    } catch (e) {
        lg.info("Request to Piston failed:");
        console.error(e);
        return "ERROR: Request to Piston failed";
    }
}
