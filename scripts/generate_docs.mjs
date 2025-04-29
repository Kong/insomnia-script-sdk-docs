#!/usr/bin/env zx

const tempDir = tmpdir('generate-insomnia-script-sdk-docs');
const docsDir = await $`pwd`;

const insoDirEnv = await $`echo $INSO_DIR`;
let insoDir = '';
let needRestorePackageJson = false;
if (insoDirEnv !== '') {
    insoDir = insoDirEnv;
    console.log(chalk.blue(`Detected INSO_DIR "${insoDir}" to generate docs...`));
    cd(insoDir);
    needRestorePackageJson = true;
} else {
    console.log(chalk.blue(`Cloning Insomnia to "${tempDir}" to generate docs...`));
    cd(tempDir);
    await $`rm -rf ./insomnia`;
    await $`git clone https://github.com/Kong/insomnia.git`;
    cd('insomnia');
    insoDir = await $`pwd`;
}

console.log(chalk.blue('Generating docs...'));
await $`cp ${docsDir}/typedoc.json ${insoDir}/packages/insomnia-scripting-environment`
await $`npm i -D typedoc`;
cd('packages/insomnia-scripting-environment');
await $`npx typedoc --options typedoc.json`;
await $`cp -r ${insoDir}/packages/insomnia-scripting-environment/docs ${docsDir}/`

if (needRestorePackageJson) {
    cd(insoDir);
    await $`git checkout HEAD package.json package-lock.json`;
}

await $`rm -rf ${tempDir}`;
console.log(chalk.blue(`${tempDir} is removed.`));

console.log(chalk.green('Done, please check "git status" in the insomnia-script-sdk-docs repo.'));
