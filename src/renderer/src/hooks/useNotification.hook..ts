/* | - Imports - | */
/* - Zustand - */
import { create } from 'zustand'

/* - Types - */
type StatusType = 'error' | 'warning' | 'info' | 'success'

type NotificationType = {
  status: StatusType
  message: string
  isActiveNotification: boolean

  setNotification: (status: StatusType, message: string, value: boolean) => void
}

/* | - use Notification - | */
/* - useNotification - */
export const useNotification = create<NotificationType>((set) => ({
  status: 'error',
  message: '',
  isActiveNotification: false,

  setNotification: (status, message, value): void => {
    set(() => ({
      status: status,
      message: message,
      isActiveNotification: value
    }))
  }
}))
