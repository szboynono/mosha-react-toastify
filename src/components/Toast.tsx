import React, { FunctionComponent, useEffect } from 'react'
import toast from '../styles/toast.module.css';

export interface ToastProps {
  id: string,
  verticalOffset: number,
  closeToast: (id: string) => void
}

const Toast: FunctionComponent<ToastProps> = ({ id, verticalOffset, closeToast }) => {

  const cleanUp = () => {
    console.log('clean up')
  }

  useEffect(() => {
    return () => {
      cleanUp()
    }
  }, [])

  return (
    <div style={{top: verticalOffset}} className={toast.toast}>
      {id} Toasting
      <button onClick={() => closeToast(id)}>close</button>
    </div>
  )
}

export default Toast