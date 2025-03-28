
import Hjson from "../lib/hjson.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let rootDir = path.normalize(path.join(__dirname, "assets"));

let args={}, argv=[];
process.argv.slice(2).forEach(function(x) { if (x[0]==="-") { let i=x.indexOf("="); args[x.substr(1, i>0?i-1:undefined)]=i>0?x.substr(i+1):true; } else argv.push(x); });

let filter=argv[0];
let success=true;
let defaultOptions = { legacyRoot: false };

function failErr(name, type, s1, s2, msg) {
  msg=msg||"  "+name+" "+type+" FAILED!";
  console.log(msg);
  if (s1 || s2) {
    let i=0;
    while (i<s1.length && s1[i]===s2[i]) i++;
    console.log("--- actual (diff at "+i+";"+(s1[i]||'').charCodeAt(0)+":"+(s2[i]||'').charCodeAt(0)+"):");
    console.log(s1);
    console.log("--- expected:");
    console.log(s2);
    if (args.dump)
      fs.writeFileSync(args.dump, s1, "utf8");
  }
  success=false;
}

function load(file, cr) {
  let text = fs.readFileSync(path.join(rootDir, file), "utf8");
  let std = text.replace(/\r/g, ""); // make sure we have unix style text regardless of the input
  return cr ? std.replace(/\n/g, "\r\n") : std;
}

function test(name, file, isJson, inputCr, outputCr) {
  let text = load(file, inputCr);
  let shouldFail = name.substr(0, 4) === "fail";
  let metaPath = path.join(rootDir, name+"_testmeta.hjson");
  let meta = fs.existsSync(metaPath) ? Hjson.parse(fs.readFileSync(metaPath, "utf8")) : defaultOptions;
  Hjson.setEndOfLine(outputCr?"\r\n":"\n");

  try {
    let data = Hjson.parse(text);

    if (!shouldFail) {
      let jsonFromData = JSON.stringify(data, null, 2);
      let hjsonFromData = Hjson.stringify(data, meta.options);
      let jsonResultRaw = load(name+"_result.json", inputCr);
      let jsonResult = JSON.stringify(JSON.parse(jsonResultRaw), null, 2);
      let hjsonResult = load(name+"_result.hjson", outputCr);
      if (jsonFromData !== jsonResult) return failErr(name, "parse", jsonFromData, jsonResult);
      if (hjsonFromData !== hjsonResult) return failErr(name, "stringify", hjsonFromData, hjsonResult);
      if (!inputCr && !outputCr && jsonResultRaw !== jsonResult) return failErr(name, "json-input", jsonResultRaw, jsonResult);
      if (isJson) {
        // if the input is JSON we can also compare Hjson.parse to JSON.parse
        let json1 = JSON.stringify(data), json2 = JSON.stringify(JSON.parse(text));
        if (json1 !== json2) return failErr(name, "json chk", json1, json2);
      }
    }
    else return failErr(name, null, null, null, "  should fail but succeeded");
  }
  catch (err) {
    if (!shouldFail) return failErr(name, "exception", err.toString(), "");
  }
  return true;
}

console.log("running tests...");

let tests=fs.readFileSync(path.join(rootDir, "testlist.txt"), "utf8").split("\n");
tests.forEach(function(file) {
  let name = file.split("_test.");
  if (name.length < 2) return;
  let isJson = name[2] === "json";
  name = name[0];

  if (filter && name.indexOf(filter) < 0) return; // ignore

  console.log("- "+name);
  test(name, file, isJson, false, false) &&
  test(name, file, isJson, false, true) &&
  test(name, file, isJson, true, false) &&
  test(name, file, isJson, true, true);
});

console.log(success?"ALL OK!":"FAIL!");
process.exit(success?0:1);

