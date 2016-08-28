const Hoek = require('hoek')

const internals = {}

internals.defaults = {
  timeout: 5 * 1000,
  stopCallback: (err) => { }
}

exports.register = (server, options, next) => {
  const settings = Hoek.applyToDefaults(internals.defaults, options)

  const stopServer = function() {
    server.root.stop({ timeout: settings.timeout }, settings.stopCallback)
  }

  process.on('SIGINT', stopServer)
  process.on('SIGTERM', stopServer)

  next()
}

exports.register.attributes = {
  pkg: require('../package.json')
}
