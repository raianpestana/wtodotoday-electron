import { ElectronAPI } from '@electron-toolkit/preload'
import type { ApiType } from './api.type'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiType
  }
}
