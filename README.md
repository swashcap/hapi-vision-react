# hapi-vision-react

_Experimenting with Vision template rendering and React_

* **Purpose:** explore using [Vision](https://github.com/hapijs/vision) and server-side rendered React ([the hapi-react-views example](https://github.com/hapijs/vision/blob/a7026b5a738b0d13d5ab8c403ef631d758c2ae6c/examples/jsx/index.js) meddles with runtime and [doesn't support streaming](https://github.com/jedireza/hapi-react-views/issues/66))
* **Conclusion:** Vision's server decoration is nice, but it's more suited for traditional templates-in-files that are compiled via a template engine like [handlebars](https://handlebarsjs.com): Vision will always read your template, even if it's a JavaScript module. Although we could [hack this into Node.js's module system](https://github.com/nodejs/node/blob/ea46db664285869fca7bf0d464d814625aae3997/lib/internal/modules/cjs/loader.js#L678-L764), React server-side rendering operates better in the Node.js environment (using `require`s), making Vision a not-so-great option for SSR.
