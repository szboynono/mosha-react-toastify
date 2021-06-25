import { Position, ToastObject } from './types'

const toasts: Record<Position, ToastObject[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': []
}

export const addToastObj = (position: Position, ToastObj: ToastObject): void => {
  toasts[position].push(ToastObj)
}

export const removeToastObj = (id: string, position: Position): ToastObject | undefined => {
  const index = toasts[position].findIndex(obj => id === obj.id)
  if (index === -1) return;
  return toasts[position].splice(index, 1)[0]
}