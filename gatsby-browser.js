const {
  default: replaceComponentRenderer,
} = require("./dist/replaceComponentRenderer");
const { default: shouldUpdateScroll } = require("./dist/shouldUpdateScroll");
const { default: onClientEntry } = require("./dist/onClientEntry");

exports.onClientEntry = onClientEntry;
exports.replaceComponentRenderer = replaceComponentRenderer;
exports.shouldUpdateScroll = shouldUpdateScroll;
