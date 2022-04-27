// @ts-check

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

const envExampleFile = path.join(projectRoot, '.env.example');
const envFile = path.join(projectRoot, '.env');

if (!fs.existsSync(envFile)) fs.copyFileSync(envExampleFile, envFile);
