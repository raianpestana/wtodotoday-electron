/* | - Imports - | */
/* - Zustand - */
import { create } from 'zustand'

/* - Types - */
import { DynamicIconType } from '../components/Dashboard/DynamicIcon.component'

export type DirectoryProfileType = {
  id: number
  name: string
  description: string
  information: string
  icon: DynamicIconType
  createdDate: Date
  updatedAt: Date
  folders: FolderProfileType[]
}

export type FolderProfileType = {
  id: number
  name: string
  description: string
  information: string
  icon: DynamicIconType
  createdDate: Date
  updatedAt: Date
  lists: ListProfileType[]
}

export type ListProfileType = {
  id: number
  name: string
  description: string
  icon: DynamicIconType
  information: string
  state: string
  createdDate: Date
  updatedAt: Date
}

type ProfileType = {
  id: number
  username: string
  email: string
  fullname: string
  createdDate: Date
  updatedAt: Date
  directories: DirectoryProfileType[]
}

type StatsType = {
  directories: number
  folders: number
  lists: number
}

type UseProfileType = {
  profile: ProfileType
  stats: StatsType

  setProfile: (value: ProfileType, stats: StatsType) => void

  deleteDirectory: (idD: string | undefined) => void
  editDirectory: (idD: string | undefined, value: DirectoryProfileType) => void
  getDirectoryId: (idD: string | undefined) => number
  setDirectory: (value: DirectoryProfileType) => void

  deleteFolder: (idD: string | undefined, idF: string | undefined) => void
  editFolder: (idD: string, idF: string, value: FolderProfileType) => void
  getFolderId: (idD: string | undefined, idF: string | undefined) => number
  setFolder: (idD: string, value: FolderProfileType) => void

  deleteList: (idD: string, idF: string, idL: string) => void
  editList: (idD: string, idF: string, idL: string, value: ListProfileType) => void
  setList: (idD: string, idF: string, value: ListProfileType) => void
  getListId: (idD: string | undefined, idF: string | undefined, idL: string | undefined) => number

  getDateString: (date: Date) => string
}

/* | - use Profile - | */
/* - useProfile - */
export const useProfile = create<UseProfileType>((set, get) => ({
  profile: {
    id: 0,
    username: '',
    email: '',
    fullname: '',
    createdDate: new Date(),
    updatedAt: new Date(),
    directories: []
  },

  stats: {
    directories: 0,
    folders: 0,
    lists: 0
  },

  setProfile: (value, stats): void => {
    set(() => ({
      profile: value,
      stats: stats
    }))
  },

  setDirectory: (value): void => {
    set((state) => ({
      profile: {
        ...state.profile,
        directories: [...state.profile.directories, value]
      },
      stats: { ...state.stats, directories: get().stats.directories + 1 }
    }))
  },

  editDirectory: (idD, value): void => {
    set(() => {
      const indexD = get().getDirectoryId(idD)
      if (value.description !== undefined) {
        get().profile.directories[indexD].description = value.description
      }

      if (value.icon !== undefined) {
        get().profile.directories[indexD].icon = value.icon
      }

      if (value.information !== undefined) {
        get().profile.directories[indexD].information = value.information
      }

      if (value.name !== undefined) {
        get().profile.directories[indexD].name = value.name
      }

      return {}
    })
  },

  getDirectoryId: (idD): number => {
    if (idD) {
      const index = get().profile.directories.findIndex(
        (x: { id: number }) => x.id === parseInt(idD)
      )
      return index
    }
    return 0
  },

  /* - Folder - */
  deleteDirectory: (idD): void => {
    set((state) => {
      const indexD = get().getDirectoryId(idD)
      if (indexD > -1) {
        get().profile.directories.splice(indexD, 1)
      }
      return {
        stats: { ...state.stats, directories: get().stats.directories - 1 }
      }
    })
  },

  deleteFolder: (idD, idF): void => {
    set((state) => {
      get().profile.directories[get().getDirectoryId(idD)].folders.splice(
        get().getFolderId(idD, idF),
        1
      )

      return {
        stats: { ...state.stats, folders: get().stats.folders - 1 }
      }
    })
  },

  editFolder: (idD, idF, value): void => {
    set(() => {
      const indexD = get().getDirectoryId(idD)
      const indexF = get().getFolderId(idD, idF)

      if (value.description !== undefined) {
        get().profile.directories[indexD].folders[indexF].description = value.description
      }

      if (value.icon !== undefined) {
        get().profile.directories[indexD].folders[indexF].icon = value.icon
      }

      if (value.information !== undefined) {
        get().profile.directories[indexD].folders[indexF].information = value.information
      }

      if (value.name !== undefined) {
        get().profile.directories[indexD].folders[indexF].name = value.name
      }

      return {}
    })
  },

  setFolder: (idD, value): void => {
    set((state) => {
      state.profile.directories[get().getDirectoryId(idD)].folders.push(value)

      return { stats: { ...state.stats, folders: get().stats.folders + 1 } }
    })
  },

  setList: (idD, idF, value): void => {
    set((state) => {
      state.profile.directories[get().getDirectoryId(idD)].folders[
        get().getFolderId(idD, idF)
      ].lists.push(value)

      return { stats: { ...state.stats, lists: get().stats.lists + 1 } }
    })
  },

  deleteList: (idD, idF, idL): void => {
    set((state) => {
      get().profile.directories[get().getDirectoryId(idD)].folders[
        get().getFolderId(idD, idF)
      ].lists.splice(get().getListId(idD, idF, idL), 1)

      return {
        stats: { ...state.stats, lists: get().stats.lists - 1 }
      }
    })
  },

  editList: (idD, idF, idL, value): void => {
    set(() => {
      const indexD = get().getDirectoryId(idD)
      const indexF = get().getFolderId(idD, idF)
      const indexL = get().getListId(idD, idF, idL)

      if (value.description !== undefined) {
        get().profile.directories[indexD].folders[indexF].lists[indexL].description =
          value.description
      }

      if (value.icon !== undefined) {
        get().profile.directories[indexD].folders[indexF].lists[indexL].icon = value.icon
      }

      if (value.information !== undefined) {
        get().profile.directories[indexD].folders[indexF].lists[indexL].information =
          value.information
      }

      if (value.name !== undefined) {
        get().profile.directories[indexD].folders[indexF].lists[indexL].name = value.name
      }

      if (value.state !== undefined) {
        get().profile.directories[indexD].folders[indexF].lists[indexL].state = value.state
      }

      return {}
    })
  },

  getFolderId: (idD, idF): number => {
    if (idD && idF) {
      const indexD = get().profile.directories.findIndex(
        (x: { id: number }) => x.id === parseInt(idD)
      )

      const indexF = get().profile.directories[indexD].folders.findIndex(
        (x: { id: number }) => x.id === parseInt(idF)
      )

      return indexF
    }
    return 0
  },

  getListId: (idD, idF, idL): number => {
    if (idD && idF && idL) {
      const indexD = get().profile.directories.findIndex(
        (x: { id: number }) => x.id === parseInt(idD)
      )

      const indexF = get().profile.directories[indexD].folders.findIndex(
        (x: { id: number }) => x.id === parseInt(idF)
      )

      const indexL = get().profile.directories[indexD].folders[indexF].lists.findIndex(
        (x: { id: number }) => x.id === parseInt(idL)
      )

      return indexL
    }
    return 0
  },

  getDateString: (date: Date): string => {
    const d = new Date(date)
    const getDay = d.toLocaleString('default', { day: '2-digit' })
    const getMonth = d.toLocaleString('default', { month: '2-digit' })
    const getYear = d.toLocaleString('default', { year: 'numeric' })
    const getHour = d.toLocaleString('default', { hour: '2-digit' })
    const getMinute = d.toLocaleString('default', { minute: '2-digit' })
    const getSeconds = d.toLocaleString('default', { second: '2-digit' })
    return `${getDay}/${getMonth}/${getYear} a las ${getHour}:${getMinute}:${getSeconds}`
  }
}))
