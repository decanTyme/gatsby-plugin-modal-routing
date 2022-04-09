import { navigate } from 'gatsby'
import React from 'react'
import Modal from 'react-modal'
import ModalRoutingContext from './ModalRoutingContext'

const withoutPrefix = (path) => {
  const prefix =
    typeof __BASE_PATH__ !== `undefined` ? __BASE_PATH__ : __PATH_PREFIX__

  return path.slice(prefix ? prefix.length : 0)
}

const element = {}

function PageElementWrapper({ props, opts }) {
  const [modalProps, setModalProps] = React.useState({ ...opts?.modalProps })
  const modalContentRef = React.useRef(null)
  const [state, setState] = React.useState({
    prevProps: null,
    lastModalProps: null,
    props: null,
    pathname: null,
  })

  const handleRequestClose = () => {
    navigate(withoutPrefix(state.prevProps.location.pathname), {
      state: {
        noScroll: true,
      },
    })
  }

  React.useEffect(() => {
    if (
      state.prevProps?.location.pathname !== props.location.pathname &&
      props.location.state?.modal &&
      modalContentRef.current
    ) {
      modalContentRef.current.scrollTop = 0
    }
  })

  if (state.pathname !== props?.location.pathname) {
    setState({
      pathname: props?.location.pathname,
      props,
      ...(state.props?.location.state?.modal
        ? {
            // Old page was a modal, keep track so we
            // can render the contents while closing
            lastModalProps: state.props,
          }
        : {
            // Old page was not a modal, keep track so
            // we can render the contents under modals
            prevProps: state.props,
          }),
    })
  }

  const isModal = state.prevProps && props.location.state.modal

  const resources = isModal
    ? state.prevProps.pageResources
    : props.pageResources

  // The page is the previous path if this is a modal,
  // otherwise it's the current path
  element.page = React.createElement(resources.component, {
    ...(isModal ? state.prevProps : props),
    key: resources.page.path,
  })

  if (isModal) {
    // Rendering the current page as a modal,
    // so create an element with the page contents
    element.modal = React.createElement(props.pageResources.component, {
      ...props,
      key: props?.pageResources.page.path,
    })
  } else if (state.lastModalProps) {
    // Not rendering the current page as a modal, but we may
    // be in the process of animating the old modal content
    // to close, so render the last modal content we have cached
    element.modal = React.createElement(
      state.lastModalProps.pageResources.component,
      {
        ...state.lastModalProps,
        key: state.lastModalProps.pageResources.page.path,
      }
    )
  }

  const modalValues = React.useMemo(
    () => ({
      modal: isModal,
      closeTo: state.prevProps
        ? withoutPrefix(state.prevProps.location.pathname)
        : '/',
      setModalProps,
    }),
    [isModal, state.prevProps]
  )

  return (
    <>
      {element.page}

      <Modal
        onRequestClose={handleRequestClose}
        contentRef={(node) => {
          modalContentRef.current = node
        }}
        {...modalProps}
        isOpen={Boolean(isModal)}
      >
        {element.modal ? (
          <React.Fragment key={props?.location.key}>
            <ModalRoutingContext.Provider value={modalValues}>
              {element.modal}
            </ModalRoutingContext.Provider>
          </React.Fragment>
        ) : null}
      </Modal>
    </>
  )
}

const wrapPageElement = (context, opts) =>
  React.createElement(PageElementWrapper, {
    ...context,
    opts,
  })

export default wrapPageElement
