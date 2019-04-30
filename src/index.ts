import 'hard-rejection/register'

import hapi from '@hapi/hapi'
import vision from '@hapi/vision'
import { render } from './render'

export const getServer = async () => {
  const server = new hapi.Server({
    port: 3000
  })

  await server.register(vision)

  server.views({
    compileMode: 'async',
    engines: {
      js: {
        /**
         * Vision reads the template file with the `.js` extension using
         * `fs.readFile` and caches its 'compiled' version.
         */
        compile(template, options, next) {
          try {
            let content = require(options.filename)
            content = content.default ? content.default : content

            next(null, (context, options, callback) => {
              // @ts-ignore
              callback(null, render({ content, context }))
            })
          } catch (error) {
            // @ts-ignore
            next(error)
          }
        }
      }
    },
    relativeTo: __dirname,
    path: 'templates'
  })

  server.route([
    {
      handler: {
        view: {
          context: {
            title: 'Home Page'
          },
          template: 'index'
        }
      },
      method: 'GET',
      path: '/'
    },
    {
      handler: {
        view: {
          context: {
            title: 'About'
          },
          template: 'about'
        }
      },
      method: 'GET',
      path: '/about'
    }
  ])

  return server
}

if (require.main === module) {
  ;(async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
  })()
}
