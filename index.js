#!/usr/bin/env node
var dat = require('dat')
var aws = require('aws-stream')
var tool = require('tool-stream')
var xmlJSON = require('xml-json')
var pace = require('pace-stream')


var db = dat('elife', ready)
var progress = pace.obj()


function ready(error) {
  if (error) throw error

  var concurrency = Number(process.argv.slice(2)[0]) || 1

  aws.s3.ls('elife-cdn', 'elife-articles')
  .pipe(tool.collectMatch('Key', 'xml'))
  .pipe(progress.incrementTotal)
  .pipe(aws.s3.get('elife-cdn', concurrency))
  .pipe(xmlJSON('article'))
  .pipe(progress)
  .pipe(db.createWriteStream())

}
