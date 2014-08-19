dat-elife
=========

Usage
-----

```bash
export AWS_ACCESS_KEY_ID=AKIAITJZXXXXXXXXXXXX
export AWS_SECRET_ACCESS_KEY=9jp49DRRK2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

npm install dat-elife -g

dat-elife # <optional number of parallel get> (e.g. dat-elife 30)
cd elife
dat listen
```

Relevant bits of code
---------------------
This is mostly done in 5 lines of code (check [index.js](https://github.com/bmpvieira/dat-elife/blob/master/index.js)
for everything).

```javascript
aws.s3.ls('elife-cdn', 'elife-articles')
.pipe(tool.collectMatch('Key', 'xml'))
.pipe(aws.s3.get('elife-cdn'))
.pipe(xmlJSON('article'))
.pipe(db.createWriteStream())
```
