/* | - Imports - | */
/* - Dependencies - */
import React from 'react'
import ReactDOM from 'react-dom/client'

/* - App - */
import { App } from './app/App'

/* ReactDOM */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
