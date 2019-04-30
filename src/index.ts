import 'hard-rejection/register'

import hapi from '@hapi/hapi'

const init = async () => {
  const server = new hapi.Server({
    host: 'localhost',
    port: 3000
  })

  await server.start()

  console.log(`Server running on ${server.info.uri}`)
}

init()
