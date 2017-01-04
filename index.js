var window = require('global/window')
var assert = require('assert')

module.exports = politeElement

function politeElement (renderBasic, renderFancy) {
  assert.equal(typeof renderBasic, 'function', 'polite-element: renderBasic should be a function')
  assert.equal(typeof renderFancy, 'function', 'polite-element: renderFancy should be a function')

  var hasIdleCallback = (typeof window.requestIdleCallback !== 'undefined')
  var isServer = (!window.document)

  var parentNode = null
  var prevEl = null

  var el = (isServer || hasIdleCallback)
    ? renderBasic()
    : renderFancy()

  if (hasIdleCallback) {
    window.requestIdleCallback(function () {
      parentNode = el.parentNode
      prevEl = el
      el = renderFancy()

      window.requestAnimationFrame(function () {
        if (el.parentNode) return
        if (!parentNode) return
        parentNode.replaceChild(el, prevEl)
      })
    })
  }

  return function () {
    return el
  }
}
