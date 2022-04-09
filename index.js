const { default: ModalRoutingContext } = require('./dist/ModalRoutingContext')
const { default: ModalRoutingLink } = require('./dist/ModalRoutingLink')
const { default: useModalRouting } = require('./dist/useModalRouting')

module.exports = {
  Link: ModalRoutingLink,
  ModalRoutingContext,
  useModalRouting,
}
