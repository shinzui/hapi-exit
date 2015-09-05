# hapi-exit

[![Build Status](https://travis-ci.org/shinzui/hapi-exit.png?branch=master)](https://travis-ci.org/shinzui/hapi-exit) 

Plugin intercepts *SIGTTERM* and *SIGINT* and ensures that `server.stop()` is called.
