/* | - Imports - | */
/* - React - */
import { RouterProvider } from 'react-router-dom'

/* - Style muy & emotion - */
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

/* - Fonts - */
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

/* - Routes - */
import { routes } from '../routes/routes'

/* - Theme - */
import { DefaultTheme } from '../theme/Default.theme'

/* | - App - | */
/* - App - */
export const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}
