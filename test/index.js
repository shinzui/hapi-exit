const Hapi = require('hapi')
const Lab = require('lab')
const Code = require('code')
const Plugin = require('../lib/index')

const lab = exports.lab = Lab.script()
const expect = Code.expect
const describe = lab.describe
const it = lab.test

it('registers the plugin', (done) => {

  const server = new Hapi.Server()

  server.register({ register: Plugin }, (err) => {
    expect(err).to.not.exist()
    done()
  })

})


it('Intercepts SIGINT', (done) => {

  let server = new Hapi.Server()
  server.connection()

  let stopCalled = false

  const stopCallback = () => {
    stopCalled = true

    if ( server )  {
      done()
      server = null
    }
  }

  server.register({ register: Plugin, options: { timeout: 0, stopCallback: stopCallback } }, (err) => { })

  server.start(function(err) {
    process.kill(process.pid, 'SIGINT')
  })
})

it('Intercepts SIGTERM', (done) => {

  let server = new Hapi.Server()
  server.connection()

  let stopCalled = false

  const stopCallback = () => {
    stopCalled = true

    if ( server )  {
      done()
      server = null
    }
  }

  server.register({ register: Plugin, options: { timeout: 0, stopCallback: stopCallback } }, (err) => { })

  server.start((err) => {
    process.kill(process.pid, 'SIGTERM')
  })

})
