import React, { FunctionComponent, useEffect, useState } from 'react'
import classes from '../styles/toast.module.css';
import animations from '../styles/bounce.module.css';
import { CSSTransition } from 'react-transition-group';
import { ToastOptions } from '../types';

export interface ToastProps {
  id: string,
  verticalOffset: number,
  text: string,
  description?: string,
  options?: ToastOptions,
  closeToast: (id: string) => void
}

const Toast: FunctionComponent<ToastProps> = ({ id, text, description, verticalOffset, options, closeToast }) => {
  const [animate, setAnimate] = useState(false)
  const [hide, setHide] = useState(true)

  const onCloseButtonClick = () => {
    setAnimate(false)
    closeToast(id)
  }

  const cleanUp = () => {
    console.log('clean up')
  }

  useEffect(() => {
    setAnimate(true)
    if(options) {
      setTimeout(() => {
        onCloseButtonClick()
      }, options.timeout)
    }
    return () => {
      cleanUp()
    }
  }, [])

  return (
    <CSSTransition 
      in={animate} 
      timeout={700} 
      classNames={{
        enterActive: animations.BounceEnterActive,
        exitActive: animations.BounceExitActive
      }}
      onEnter={() => setHide(false)}>
      <div hidden={hide} style={{ top: verticalOffset }} className={classes.Toast}>
        {id} {text} {description}
        <button onClick={() => onCloseButtonClick()}>close</button>
      </div>
    </CSSTransition>
  )
}

export default Toast