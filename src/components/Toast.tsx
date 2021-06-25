import React, { FunctionComponent, useEffect } from 'react'

interface ToastProps {
  id: string,
  closeToast: (id: string) => void
}

const Toast: FunctionComponent<ToastProps> = ({ id, closeToast }) => {

  const cleanUp = () => {
    console.log('clean up')
  }

  useEffect(() => {
    console.log('init')
    return () => {
      console.log('done')
    }
  }, [])

  return (
    <>
      Toasting
      <button onClick={() => closeToast(id)}>close</button>
    </>
  )
}

export default Toast