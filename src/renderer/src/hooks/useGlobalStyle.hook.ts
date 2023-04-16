/* | - Imports - | */
/* - Zustand - */
import { create } from 'zustand'

/* - Types - */
type GlobalStylePropSizeType = 'small' | 'medium' | 'large'
type GlobalStylePropFontSizeType = 'small' | 'medium' | 'large' | 'inherit'

/* GlobalStyleCSSType */
type GlobalStyleCSSType = {
  header: {
    button: {
      size: number
    }
  }
  nav: {
    isOnlyIcons: boolean
    button: {
      size: number
    }
    directory: {
      width: string
    }
    folder: {
      width: string
    }
  }
  background: { color: string }
  border: {
    color: string
    radius: string
  }
}

type GlobalStyleFuncType = {
  changeSizeHeaderIcon: (
    size: GlobalStylePropSizeType,
    fontSize: GlobalStylePropFontSizeType
  ) => void

  toggleMenu: (value: boolean) => void
}

type GlobalStyleType = {
  CSS: GlobalStyleCSSType
  func: GlobalStyleFuncType
}

/* | - use Global Style - | */
/* - useGlobalStyle - */
export const useGlobalStyle = create<GlobalStyleType>((set) => ({
  CSS: {
    header: {
      button: {
        size: 22
      }
    },
    nav: {
      isOnlyIcons: false,
      button: {
        size: 22
      },
      directory: {
        width: '12rem'
      },
      folder: {
        width: '12rem'
      }
    },
    background: {
      color: 'rgb(23, 23, 23)'
    },
    border: {
      color: 'rgb(50, 50, 50)',
      radius: '8px'
    }
  },
  func: {
    changeSizeHeaderIcon: (
      size: GlobalStylePropSizeType,
      fontSize: GlobalStylePropFontSizeType
    ): void =>
      set((state) => ({
        ...state,
        CSS: {
          ...state.CSS,
          header: {
            ...state.CSS.header,
            icon: { size: size, fontSize: fontSize }
          }
        }
      })),

    toggleMenu: (value): void =>
      set((state) => ({
        ...state,
        CSS: {
          ...state.CSS,
          nav: {
            ...state.CSS.nav,
            isOnlyIcons: value
          }
        }
      }))
  }
}))
