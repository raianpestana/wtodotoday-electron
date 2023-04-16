/* | - Imports - | */
/* - Dependencies - */
import { Navigate, RouteObject } from 'react-router-dom'

/* - Layouts - */
/* Auth */ import { AuthLayout } from '../layouts/Auth/Auth.layout'

/* - Pages - */
/* Login */ import { LoginPage } from '../pages/Auth/Login.page'
/* Register */ import { RegisterPage } from '../pages/Auth/Register.page'

/* | - Auth Routes - | */
/* - Consts - */
/* AuthRoutes */
export const AuthRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    {
      element: <Navigate to="/auth/login" replace />,
      path: '/'
    },
    {
      element: <LoginPage />,
      path: '/auth/login'
    },
    {
      element: <RegisterPage />,
      path: '/auth/register'
    }
  ]
}
