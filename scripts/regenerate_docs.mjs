#!/usr/bin/env zx

const gotTempDir = await question('Please input a temp dir for cloning the Insomnia repo (/tmp): ');
const tempDir = gotTempDir.trim() === '' ? '/tmp' : gotTempDir.trim(); 
const docsDir = await $`pwd`;

echo(`Will clone Insomnia to "${tempDir}"`);
cd(tempDir);
await $`rm -rf ./insomnia`;
await $`git clone https://github.com/Kong/insomnia.git`;
cd('insomnia');
const insoDir = await $`pwd`;

echo('Generating docs...');
await $`npm i -D typedoc`;
cd('packages/insomnia-scripting-environment');
await $`npx typedoc`;
await $`cp -r ${insoDir}/packages/insomnia-scripting-environment/docs ${docsDir}/`

echo('Done, please check "git status" in the insomnia-script-sdk-docs repo.');
