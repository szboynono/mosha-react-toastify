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
  const component = createElement(Toast, { id, verticalOffset, closeToast })
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
  const toasts = getToastsByPosition('top-left');
  const pendindRemoveToastIndex = toasts.findIndex(toast => toast.id === id);
  const pendingRemoveToast = toasts[pendindRemoveToastIndex];
  const pendingRemoveToastOffset = (pendingRemoveToast.container.firstChild as HTMLElement).offsetHeight
  const toastObj = removeToastObj(id, 'top-left')


  for(let i = pendindRemoveToastIndex; i < toasts.length; i++) {
    const currentOffset = toasts[i].component.props.verticalOffset;
    const clonedElement = cloneElement(toasts[i].component, { verticalOffset: currentOffset - pendingRemoveToastOffset - 16})
    setComponentByIdAndPosition(toasts[i].id, 'top-left', clonedElement)
    render(toasts[i].component, toasts[i].container)
  }

  if (!toastObj) throw new Error('Nothing to remove!')
  cleanUp(toastObj.container)
}

const cleanUp = (container: HTMLElement) => {
  unmountComponentAtNode(container)
  container.remove()
}