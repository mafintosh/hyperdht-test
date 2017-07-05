#!/usr/bin/env node

var test = require('./')

test(function (err, peer) {
  if (err) throw err
  console.log('hyperdht worked', peer)
})
