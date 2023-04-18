/* | - Imports - | */
/* - Dependencies - */
import { Navigate, RouteObject } from 'react-router-dom'

/* - Layouts - */
/* Dashboard */ import { DashboardLayout } from '../layouts/Dashboard/Dashboard.layout'

/* - Pages - */
/* - Main - */
/* About */ import { AboutPage } from '../pages/Dashboard/Main/About.page'
/* Account */ import { AccountPage } from '../pages/Dashboard/Main/Account.page'
/* Inf */ import { InfPage } from '../pages/Dashboard/Main/Inf.page'
/* Thanks */ import { ThanksPage } from '../pages/Dashboard/Main/Thanks.page'
/* Update */ import { UpdatePage } from '../pages/Dashboard/Main/Update.page'

/* - Directory - */
/* Inf */ import { InfPage as InfDirectoryPage } from '../pages/Dashboard/Directory/Inf.page'

/* - Folder - */
/* Inf */ import { InfPage as InfFolderPage } from '../pages/Dashboard/Folder/Inf.page'

/* | - Dashboard Routes - | */
/* - Consts - */
/* DashboardRoutes */
export const DashboardRoutes: RouteObject = {
  element: <DashboardLayout />,
  children: [
    /* - Before - */
    {
      element: <Navigate to="/dashboard/main/inf" replace />,
      path: '/dashboard'
    },

    /* - Main - */
    {
      element: <AboutPage />,
      path: '/dashboard/main/about'
    },

    {
      element: <AccountPage />,
      path: '/dashboard/main/account'
    },

    {
      element: <InfPage />,
      path: '/dashboard/main/inf'
    },

    {
      element: <ThanksPage />,
      path: '/dashboard/main/thanks'
    },

    {
      element: <UpdatePage />,
      path: '/dashboard/main/update'
    },

    /* - Directory - */
    {
      element: <InfDirectoryPage />,
      path: '/dashboard/directory/:idD/inf'
    },

    /* - Folder - */
    {
      element: <InfFolderPage />,
      path: '/dashboard/directory/:idD/folder/:idF'
    }
  ]
}
