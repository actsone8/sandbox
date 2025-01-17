let body = require('body-parser')

/**
 * Body parser for odd bedfellows
 * tl;dr: WebSocket and Architect v5 need their bodies constructed (and parsed) here
 * - @http request bodies were already handled by our binary handler middleware
 * - @ws emulation needs internal payloads parsed here to send messages to clients
 * - Arc v5 also happend to auto-parse JSON + form URL-encoded via VTL
 */
module.exports = function payloadEncoding (app) {
  let isWSsend = req => req.url === '/__arc'
  let limit = '6mb'

  // JSON payloads (Arc v5 + WS)
  let jsonTypes = /^application\/.*json/
  let isJSON = req => jsonTypes.test(req.headers['content-type'])
  let parseJson = req => isJSON(req) && isWSsend(req)
  app.use(body.json({ limit, type: parseJson }))
}
