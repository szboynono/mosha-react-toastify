export type ToastType = 'info' | 'danger' | 'warning' | 'success' | 'default'

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

export type TransitionType = 'bounce' | 'zoom' | 'slide'

export interface ContentObject {
  title: string
  description?: string
}

export interface DisplayContentObject {
  text: string
  description?: string
}

export type ToastContent =
  | string
  | ContentObject

export interface ToastOptions {
  type?: ToastType
  timeout?: number
  showCloseButton?: boolean
  position?: Position
  showIcon?: boolean
  transition?: TransitionType
  hideProgressBar?: boolean
  useComponentContent?: boolean
  toastBackgroundColor?: string
  swipeClose?: boolean
  onClose?: () => void
}