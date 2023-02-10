const bs = require('browser-sync').create()

module.exports = function browser() {
  bs.init({
    server: {
      baseDir: 'dist',
    },
    callbacks: {
      ready: (err, bs) => {
        bs.addMiddleware('*', (req, res) => {
          res.writeHead(302, {
            location: "404.html"
          });
          res.end("Redirecting!");
        })
      }
    },
    browser: 'chrome',
    logPrefix: 'BS-HTML:',
    logLevel: 'info',
    logConnections: true,
    logFileChanges: true,
    open: true,
    watch: true
  })
}