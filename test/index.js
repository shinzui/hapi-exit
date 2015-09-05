var Hapi = require('hapi')
var Lab = require('lab')
var Code = require('code')
var Plugin = require('../lib/index')

var lab = exports.lab = Lab.script()
var expect = Code.expect
var describe = lab.describe
var it = lab.test

it('registers the plugin', function(done) {

  var server = new Hapi.Server()

  server.register({ register: Plugin }, function(err) {
    expect(err).to.not.exist()
    done()
  })

})


it('Intercepts SIGINT', function(done) {

  var server = new Hapi.Server()
  server.connection()

  var stopCalled = false

  var stopCallback = function() {
    stopCalled = true

    if ( server )  {
      done()
      server = null
    }
  }

  server.register({ register: Plugin, options: { timeout: 0, stopCallback: stopCallback } }, function(err) { })

  server.start(function(err) {
    process.kill(process.pid, 'SIGINT')
  })
})

it('Intercepts SIGTERM', function(done) {

  var server = new Hapi.Server()
  server.connection()


  var stopCalled = false

  var stopCallback = function() {
    stopCalled = true

    if ( server )  {
      done()
      server = null
    }
  }

  server.register({ register: Plugin, options: { timeout: 0, stopCallback: stopCallback } }, function(err) { })

  server.start(function(err) {
    process.kill(process.pid, 'SIGTERM')
  })

})
