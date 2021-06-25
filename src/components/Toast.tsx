import React, { FunctionComponent, useEffect } from 'react'

export interface ToastProps {
  id: string,
  closeToast: (id: string) => void
}

const Toast: FunctionComponent<ToastProps> = ({ id, closeToast }) => {

  const cleanUp = () => {
    console.log('clean up')
  }

  useEffect(() => {
    return () => {
      cleanUp()
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