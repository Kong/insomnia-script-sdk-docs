#!/usr/bin/env zx

const tempDir = tmpdir('generate-insomnia-script-sdk-docs');
const docsDir = await $`pwd`;

console.log(chalk.blue(`Cloning Insomnia to "${tempDir}" to generate docs...`));
cd(tempDir);
await $`rm -rf ./insomnia`;
await $`git clone https://github.com/Kong/insomnia.git`;
cd('insomnia');
const insoDir = await $`pwd`;

console.log(chalk.blue('Generating docs...'));
await $`cp ${docsDir}/typedoc.json ${insoDir}/packages/insomnia-scripting-environment`
await $`npm i -D typedoc`;
cd('packages/insomnia-scripting-environment');
await $`npx typedoc --options typedoc.json`;
await $`cp -r ${insoDir}/packages/insomnia-scripting-environment/docs ${docsDir}/`

await $`rm -rf ${tempDir}`;
console.log(chalk.blue(`${tempDir} is removed.`));

console.log(chalk.green('Done, please check "git status" in the insomnia-script-sdk-docs repo.'));
