var Hoek = require('hoek')

var internals = {}

internals.defaults = {
  timeout: 5 * 1000,
  stopCallback: function(err) { }
}

exports.register = function(server, options, next) {
  var settings = Hoek.applyToDefaults(internals.defaults, options)

  var stopServer = function() {
    server.root.stop({ timeout: settings.timeout }, settings.stopCallback)
  }

  process.on('SIGINT', stopServer)
  process.on('SIGTERM', stopServer)

  next()
}

exports.register.attributes = {
  pkg: require('../package.json')
}
