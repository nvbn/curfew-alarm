import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const branch = execSync("git branch --show-current").toString().trim();
if (branch !== "main") {
  console.warn(`can't release from ${branch}, it's only allowed from main`);
  process.exit(1);
}

const version = Number(readFileSync("VERSION"));
const nextVersion = version + 1;

writeFileSync("VERSION", `${nextVersion}\n`);

execSync("git add VERSION");
execSync(`git commit -m 'RELEASE ${nextVersion}'`);
execSync("git push");
execSync(`git tag ${nextVersion}`);
execSync("git push --tags");

console.log(`

Go and wait to the release page:
https://github.com/nvbn/curfew-alarm/releases/tag/${nextVersion}
`);
