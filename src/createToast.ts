import { cloneElement, createElement, FunctionComponentElement } from 'react'
import Toast, { ToastProps } from './components/Toast'
import { render, unmountComponentAtNode } from 'react-dom'
import { addToastObj, getToastsByPosition, removeToastObj, setComponentByIdAndPosition } from './state'
import { generateId } from './util'

export const createToast = () => {
  const id = generateId()

  const toasts = getToastsByPosition('top-left')
  const verticalGap = 16
  let verticalOffset = 16
  toasts.forEach(toast => {
    const temp = (toast.container.firstChild as HTMLElement).offsetHeight + verticalGap
    verticalOffset += temp
  })

  const container = createContainer()
  const component = createElement(Toast, { id, verticalOffset, triggerAnimate: false, closeToast })
  render(component, container);
  addToastObj('top-left', {
    id, container, component
  })
}

const createContainer = (): HTMLElement => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

const closeToast = (id: string) => {
  adjustToastsOnRemove(id)
  const toastObj = removeToastObj(id, 'top-left')

  if (!toastObj) throw new Error('Nothing to remove!')
  cleanUp(toastObj.container)
}

const adjustToastsOnRemove = (toastId: string) => {
  const toasts = getToastsByPosition('top-left');
  const pendindRemoveToastIndex = toasts.findIndex(toast => toast.id === toastId);
  const pendingRemoveToastOffset = (toasts[pendindRemoveToastIndex].container.firstChild as HTMLElement).offsetHeight

  for (let i = pendindRemoveToastIndex + 1; i < toasts.length; i++) {
    const currentOffset = toasts[i].component.props.verticalOffset;
    const clonedElement = cloneElement(toasts[i].component, { verticalOffset: currentOffset - pendingRemoveToastOffset - 16 })
    setComponentByIdAndPosition(toasts[i].id, 'top-left', clonedElement)
    render(toasts[i].component, toasts[i].container)
  }
}


const cleanUp = (container: HTMLElement) => {
  setTimeout(() => {
    unmountComponentAtNode(container)
    container.remove()
  }, 650)
}