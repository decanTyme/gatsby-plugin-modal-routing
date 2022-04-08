import Modal from 'react-modal'

const onClientEntry = (_, opts) => {
  const { appElement = `#___gatsby` } = opts
  Modal.setAppElement(appElement)
}

export default onClientEntry
