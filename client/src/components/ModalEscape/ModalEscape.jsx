import React, { useEffect } from "react";
import { Modal } from "@material-ui/core";

function useKeyboardEvent(key, callback) {
  useEffect(() => {
    const handler = function(event) {
      if (event.key === key) {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])
}

const EscapeModal = props => {
  const {
    children,
    onClose,
  } = props;

  useKeyboardEvent('Escape', () => {
    onClose();
  })

  return (
    <Modal {...props}>
      {children}
    </Modal>
  )
}

export default EscapeModal;

