# makeself.js
## Self-extracting archive tool in pure Node.js (no NPM)

- This is a **very basic** proof-of-concept to bring https://makeself.io functionality into JS
- SHA256 checksums are verify data intergrity
- zlib is used for compression
- For the time being, files loaded into memory, so large files are not recommended

------------------------------

### Creation:
```
node makeself_create.js [filedir]
```
This creates `makeself.js` which can extract the contained files on any machine running Node.js

### Usage:
```
node makeself.js [filedir]
```

--------------------------------

Notes:
- `makeself_create.js` will only store top-level files in target directory (ignores subfolders)
- `makeself.js` will override existing files of same name (be careful)