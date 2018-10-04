self.addEventListener('fetch', evt => {
  const { request } = evt
  const { url, method } = request
  const headers = [...request.headers]
  console.log(url)
  function getConsumer(clients) {
    return new Promise((rs, rj) => {
      // Use race condition for whoever controls the response stream
      for (const client of clients) {
        const mc = new MessageChannel()
        mc.port1.onmessage = evt => rs([evt.data, mc])
        client.postMessage({
          url,
          method,
          headers,
          scope: self.registration.scope
        }, [mc.port2])
      }
    })
  }

  evt.respondWith(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(getConsumer)
    .then(([data, consumer]) => {
      const readable = 'body' in data ? data.body : new ReadableStream({
        pull(controller) {
          console.log('requesting data')
          return new Promise(rs => {
            consumer.port1.onmessage = evt => {
              evt.data
                ? controller.enqueue(evt.data) // evt.data is Uint8Array
                : controller.close() // evt.data is null, means the stream ended
              rs()
            }
            consumer.port1.postMessage(true) // send a pull request
          })
        },
        cancel() {
          // This event is never executed
          console.log('request aborted')
          consumer.port1.postMessage(false) // send a cancel request
        }
      })

      return new Response(readable, data)
    })
    .catch(console.error)
  )
})
