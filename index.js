var window = require('global/window')
var morph = require('nanomorph')
var assert = require('assert')

module.exports = politeElement

function politeElement (renderBasic, renderFancy) {
  assert.equal(typeof renderBasic, 'function', 'polite-element: renderBasic should be a function')
  assert.equal(typeof renderFancy, 'function', 'polite-element: renderFancy should be a function')

  var hasIdleCallback = (typeof window.requestIdleCallback !== 'undefined')
  var isServer = (!window.document)

  var prevEl = null
  var el = (isServer || hasIdleCallback)
    ? renderBasic()
    : renderFancy()

  if (hasIdleCallback) {
    window.requestIdleCallback(function () {
      prevEl = el
      el = renderFancy()

      var elName = el.nodeName
      var prevElName = prevEl.nodeName
      assert.equal(elName, prevElName, 'polite-element: the root elements of the old and new tree should be the same type')

      window.requestAnimationFrame(function () {
        if (el.parentNode) return
        morph(el, prevEl)
      })
    })
  }

  return function () {
    return el
  }
}
