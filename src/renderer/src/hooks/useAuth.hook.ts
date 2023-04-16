/* | - Imports - | */
/* - Zustand - */
import { create } from 'zustand'

/* | - Types - | */
type AccountType = {
  token: string
  isAuth: boolean
}

type ActionType = {
  setToken: (token: string) => void
  logout: () => void
}

interface UseAuthType extends AccountType, ActionType {}

/* | - Consts - | */
const initialState: AccountType = {
  token: '',
  isAuth: false
}

/* | - use Auth - | */
/* - useAuth - */
export const useAuth = create<UseAuthType>((set) => ({
  ...initialState,

  setToken: (token: string): void => {
    set(() => ({
      token: token,
      isAuth: true
    }))
  },

  logout: (): void => {
    set(initialState)
  }
}))
