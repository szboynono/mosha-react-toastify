import React, { FunctionComponent, useEffect, useState } from 'react'
import classes from '../styles/toast.module.css';
import animations from '../styles/bounce.module.css';
import { CSSTransition } from 'react-transition-group';

export interface ToastProps {
  id: string,
  verticalOffset: number,
  triggerAnimate: boolean,
  closeToast: (id: string) => void
}

const Toast: FunctionComponent<ToastProps> = ({ id, verticalOffset, triggerAnimate = false, closeToast }) => {
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
        {id} Toasting
        <button onClick={() => onCloseButtonClick()}>close</button>
      </div>
    </CSSTransition>
  )
}

export default Toast