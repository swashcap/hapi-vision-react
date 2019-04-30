import 'hard-rejection/register'

import hapi from '@hapi/hapi'
import vision from '@hapi/vision'

const init = async () => {
  const server = new hapi.Server({
    port: 3000
  })

  await server.register(vision)
  await server.start()

  console.log(`Server running on ${server.info.uri}`)
}

init()
