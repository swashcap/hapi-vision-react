import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import intoStream from 'into-stream'
import multistream from 'multistream'
import { PassThrough } from 'stream'

export interface RenderContext {
  afterContent?: intoStream.Input
  beforeContent?: intoStream.Input
  bodyProps?: intoStream.Input
  description?: intoStream.Input
  head?: intoStream.Input
  htmlProps?: intoStream.Input
  title?: intoStream.Input
}

export const render = ({
  content,
  context = {}
}: {
  content?: React.ElementType
  context?: RenderContext
} = {}) => {
  const passThrough = new PassThrough()
  const pieces: multistream.Streams = [
    intoStream(`<!doctype html>
<html`)
  ]

  if (context.htmlProps) {
    pieces.push(intoStream(context.htmlProps))
  }

  pieces.push(
    intoStream(`>
  <head>
    <meta charset="utf-8">`)
  )

  if (context.title) {
    pieces.push(
      intoStream('<title>'),
      intoStream(context.title),
      intoStream('</title>')
    )
  }

  if (context.description) {
    pieces.push(
      intoStream('<meta name="description" content="'),
      intoStream(context.description),
      intoStream('">')
    )
  }

  pieces.push(
    intoStream(
      '<meta name="viewport" content="width=device-width, initial-scale=1">'
    )
  )

  if (context.head) {
    pieces.push(intoStream(context.head))
  }

  pieces.push(
    intoStream(`
  </head>
  <body`)
  )

  if (context.bodyProps) {
    pieces.push(intoStream(context.bodyProps))
  }

  pieces.push(
    intoStream(`>
`)
  )

  if (context.beforeContent) {
    pieces.push(intoStream(context.beforeContent))
  }
  if (content) {
    pieces.push(renderToNodeStream(React.createElement(content)))
  }
  if (context.afterContent) {
    pieces.push(intoStream(context.afterContent))
  }

  pieces.push(
    intoStream(`
  </body>
</html>`)
  )

  multistream(pieces).pipe(passThrough)

  return passThrough
}
