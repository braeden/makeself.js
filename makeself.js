const fs = require('fs');
const path = require('path');
const assert = require('assert');
const zlib = require('zlib');
const crypto = require('crypto');
const dir = process.argv[2] || '.';
const fileContents = {"testfile.txt":["eJzLyS9KzVXILCguzQUAGmcEbg==","Xiv1fT9AxLbfadrxk2y3ZvgyN0tPwCWafL/wbi9w8mk="]}
Object.entries(fileContents).forEach(([fileName, [data, hashStored]]) => {
    console.log(fileName)
    const hash = crypto.createHash('sha256');
    const buf = Buffer.from(data, 'base64')
    const inflated = zlib.inflateSync(buf)
    hash.update(inflated);
    assert(hash.digest('base64') === hashStored, `Hashes don't match: ${fileName}`)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    fs.writeFileSync(path.join(dir, fileName), inflated)
})