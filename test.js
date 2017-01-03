const test = require('tape')
const politeElement = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(politeElement)
})
