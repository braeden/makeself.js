const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const dir = process.argv[2] || '.';
const crypto = require('crypto');

const output = {}
fs.readdirSync(dir).forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) return
    console.log(file);
    const hash = crypto.createHash('sha256');
    fileData = fs.readFileSync(path.join(dir, file));
    hash.update(fileData);
    output[file] = [zlib.deflateSync(fileData).toString('base64'), hash.digest('base64')];
});

const makeselfOut =
    `const fs = require('fs');
const path = require('path');
const assert = require('assert');
const zlib = require('zlib');
const crypto = require('crypto');
const dir = process.argv[2] || '.';
const fileContents = ${JSON.stringify(output)}
Object.entries(fileContents).forEach(([fileName, [data, hashStored]]) => {
    console.log(fileName)
    const hash = crypto.createHash('sha256');
    const buf = Buffer.from(data, 'base64')
    const inflated = zlib.inflateSync(buf)
    hash.update(inflated);
    assert(hash.digest('base64') === hashStored, \`Hashes don't match: \${fileName}\`)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    fs.writeFileSync(path.join(dir, fileName), inflated)
})`
fs.writeFileSync('makeself.js', makeselfOut)