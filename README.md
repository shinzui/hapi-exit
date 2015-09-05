# hapi-exit

Plugin intercepts *SIGTTERM* and *SIGINT* and ensures that `server.stop()` is called.
