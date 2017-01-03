var polite = require('./')
var html = require('bel')

var el = polite(renderBasic, renderFancy)
var main = html`
  <main>
    ${el()}
  </main>
`
document.body.appendChild(main)

function renderBasic () {
  return html`
    <h1>basic render</h1>
  `
}

function renderFancy () {
  return html`
    <h1>fancy render</h1>
  `
}
