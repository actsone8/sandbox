exports.handler = async (event) => {
  const body = event
  body.message = 'Hello from get /nodejs8.10 (running nodejs8.10)'
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  }
}
