# polite-element [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Politely waits to render an element until the browser has time to spare using
[window.requestIdleCallback()][idle]. Useful to create incrementally loading
applications that don't block user interaction.

## Usage
```js
var polite = require('polite-element')
var html = require('bel')

var el = html`
  <main>
    ${polite(basicRender, renderFancy)}
  </main>
`
document.body.appendChild(el)

function renderBasic () {
  return html`
    <img alt="ms. floof" />
  `
}

function renderFancy () {
  return html`
    <img src="https://cool-cat.pix/meow" alt="ms. floof" />
  `
}
```

## API
### el = politeElement(renderBasic, renderFancy)
Create an initial element on load using `renderBasic`. Once the browser [is less
busy][idle] it will call the `renderFancy` function to load a more complex
element. Always calls `renderBasic` when run in Node.

## Installation
```sh
$ npm install polite-element
```

## See Also
- [RequestIdleCallback() browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#Browser_compatibility)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/polite-element.svg?style=flat-square
[3]: https://npmjs.org/package/polite-element
[4]: https://img.shields.io/travis/yoshuawuyts/polite-element/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/polite-element
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/polite-element/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/polite-element
[8]: http://img.shields.io/npm/dm/polite-element.svg?style=flat-square
[9]: https://npmjs.org/package/polite-element
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[idle]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
