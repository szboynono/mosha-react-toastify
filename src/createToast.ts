import React, { createElement } from 'react'
import { Position } from './types'
import Toast from './components/Toast'
import { render } from 'react-dom'

const toasts: Record<Position, any[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': []
}

let toastId = 0

export const createToast = () => {
  const toast = createElement(Toast);
  const container = document.createElement('div')
  container.style.cssText = 'background-color: blue'
  document.body.appendChild(container)
  render(toast, container)
  console.log(container.offsetHeight)
}