import { readFileSync, writeFileSync } from "fs";
import { render } from "ejs";

const version = Number(readFileSync("VERSION"));
const template = readFileSync("app.ejs.json").toString();
const rendered = render(template, { version });
writeFileSync("app.json", rendered);
