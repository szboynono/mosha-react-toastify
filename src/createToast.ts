import { createElement, FunctionComponentElement } from 'react'
import Toast, { ToastProps } from './components/Toast'
import { render, unmountComponentAtNode } from 'react-dom'
import { addToastObj, removeToastObj } from './state'
import { generateId } from './util'

export const createToast = () => {
  const id = generateId()
  const container = createContainer()
  const toast = createComponent(id)

  render(toast, container)
  addToastObj('top-center', {
    id, container
  })
}

const createContainer = (): HTMLElement => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

const createComponent = (id: string): FunctionComponentElement<ToastProps> => {
  return createElement(Toast, { id, closeToast });
}

const closeToast = (id: string) => {
  const toastObj = removeToastObj(id, 'top-center')
  if (!toastObj) throw new Error('Nothing to remove!')
  cleanUp(toastObj.container)
}

const cleanUp = (container: HTMLElement) => {
  unmountComponentAtNode(container)
  container.remove()
}