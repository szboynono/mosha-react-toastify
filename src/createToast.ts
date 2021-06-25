import React, { createElement } from 'react'
import { Position } from './types'
import Toast from './components/Toast'
import { render, unmountComponentAtNode } from 'react-dom'
import { addToastObj, removeToastObj } from './state'
import { generateId } from './util'

export const createToast = () => {

  const container = document.createElement('div')
  document.body.appendChild(container)

  const id = generateId()
  const toast = createElement(Toast, { id, closeToast });

  render(toast, container)
  addToastObj('top-center', {
    id, container
  })
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