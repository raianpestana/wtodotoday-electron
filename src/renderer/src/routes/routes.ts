/* | - Imports - | */
/* - Dependencies - */
import { createHashRouter } from 'react-router-dom'

/* - Routes - */
/* Auth */ import { AuthRoutes } from './Auth.routes'
/* Dashboard */ import { DashboardRoutes } from './Dashboard.routes'

/* | - routes - | */
export const routes = createHashRouter([AuthRoutes, DashboardRoutes])
