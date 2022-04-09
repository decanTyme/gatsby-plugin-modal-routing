import React from 'react'

const ModalRoutingContext = React.createContext({
  modal: false,
  closeTo: null,
  setModalProps: () => {},
})

export default ModalRoutingContext
