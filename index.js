var hyperdht = require('hyperdht')
var crypto = require('crypto')

module.exports = function (cb) {
  var dht = hyperdht({
    ephemeral: true,
    bootstrap: ['bootstrap1.hyperdht.org']
  })

  var key = crypto.randomBytes(32)

  dht.announce(key, {port: 10000}, function (err) {
    if (err) return cb(err)
    dht.lookup(key, function (err, data) {
      if (err) return cb(err)
      dht.unannounce(key, {port: 10000}, function () {
        dht.destroy()
        var worked = data && data[0] && data[0].peers && data[0].peers[0]
        if (!worked) return cb(new Error('No peer found'))
        cb(null, worked)
      })
    })
  })
}

