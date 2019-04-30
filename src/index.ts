import 'hard-rejection/register'

import hapi from '@hapi/hapi'
import vision from '@hapi/vision'

export const getServer = async () => {
  const server = new hapi.Server({
    port: 3000
  })

  await server.register(vision)

  return server
}

if (require.main === module) {
  ;(async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
  })()
}
