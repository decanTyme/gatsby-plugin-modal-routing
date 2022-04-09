import { useContext, useLayoutEffect } from 'react'
import ModalRoutingContext from './ModalRoutingContext'

function useModalRouting(config) {
  const { modal, closeTo, setModalProps } = useContext(ModalRoutingContext)

  const internalProps = ['onRequestClose', 'contentRef', 'isOpen']

  internalProps.forEach((prop) => {
    if (Object.keys(config?.modalProps).includes(prop))
      throw new Error(
        `The \`${prop}\` modal prop is used internally and cannot be overridden. Please remove it from the config.`
      )
  })

  useLayoutEffect(() => {
    if (config?.modalProps)
      setModalProps((prevModalProps) => ({
        ...prevModalProps,
        ...config.modalProps,
      }))
  }, [])

  return [modal, closeTo]
}

export default useModalRouting
