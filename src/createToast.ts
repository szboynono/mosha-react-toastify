import { cloneElement, createElement, FunctionComponentElement } from 'react'
import Toast, { ToastProps } from './components/Toast'
import { render, unmountComponentAtNode } from 'react-dom'
import { addToastObj, getToastsByPosition, removeToastObj, setComponentByIdAndPosition } from './state'
import { generateId } from './util'
import { ToastContent, ToastOptions } from './types'

export const createToast = (content: ToastContent, options?: ToastOptions) => {
  const id = generateId()

  const toasts = getToastsByPosition('top-left')
  const verticalGap = 16
  let verticalOffset = 16
  toasts.forEach(toast => {
    const temp = (toast.container.firstChild as HTMLElement).offsetHeight + verticalGap
    verticalOffset += temp
  })

  const container = createContainer()
  const toastProps: ToastProps = buildProps(id, content, verticalOffset, options)
  const component = createElement(Toast, toastProps)
  render(component, container);
  addToastObj('top-left', {
    id, container, component
  })
}

const buildProps = (id: string, content: ToastContent, verticalOffset: number, options?: ToastOptions): ToastProps => {
  const initializedOptions: ToastOptions = {
    type: options ? options.type || 'default' : 'default',
    timeout: options ? options.timeout || 5000 : 5000, 
    showCloseButton: options ? options.showCloseButton || true : true,
    position: options ? options.position || 'top-left' : 'top-left',
    showIcon: options ? options.showIcon || true : true ,
    transition: options ? options.transition || 'bounce' : 'bounce',
    hideProgressBar: options ? options.hideProgressBar || false : false,
    swipeClose: options ? options.swipeClose || true : true,
    onClose: () => {}
  }
  if (typeof content === 'string') {
    return { id, text: content, verticalOffset, closeToast, options: initializedOptions}
  } else {
    return { id, text: content.title, description: content.description, verticalOffset, closeToast, options: initializedOptions}
  }
}

const createContainer = (): HTMLElement => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

const closeToast = (id: string) => {
  adjustToastsOnRemove(id)
  const toastObj = removeToastObj(id, 'top-left')

  if (!toastObj) return;
  cleanUp(toastObj.container)
}

const adjustToastsOnRemove = (toastId: string) => {
  const toasts = getToastsByPosition('top-left');
  const pendindRemoveToastIndex = toasts.findIndex(toast => toast.id === toastId);
  if (pendindRemoveToastIndex === -1) return;
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