const { default: wrapPageElement } = require('./dist/PageElementWrapper')
const { default: shouldUpdateScroll } = require('./dist/shouldUpdateScroll')
const { default: onClientEntry } = require('./dist/onClientEntry')

exports.onClientEntry = onClientEntry
exports.wrapPageElement = wrapPageElement
exports.shouldUpdateScroll = shouldUpdateScroll
