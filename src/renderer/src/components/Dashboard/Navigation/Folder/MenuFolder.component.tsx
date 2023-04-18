/* | - Imports - | */
/* - @mui/material - */
import Divider from '@mui/material/Divider'

/* - @mui/icons-material - */
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

/* - Components - */
import { MenuComponent } from '../Menu.component'
import { DynamicIconComponent } from '../../DynamicIcon.component'

const folderMain = [
  {
    id: 1,
    name: 'Cuenta',
    to: 'account',
    icon: <ManageAccountsOutlinedIcon />
  },

  { id: 2, name: 'Acerca de', to: 'about', icon: <InfoOutlinedIcon /> },

  {
    id: 3,
    name: 'Actualizar',
    to: 'update',
    icon: <UpgradeOutlinedIcon />
  },

  {
    id: 4,
    name: 'Gratitud',
    to: 'thanks',
    icon: <FavoriteBorderOutlinedIcon />
  }
]

/* - Hooks - */
import { useProfile } from '../../../../hooks/useProfile.hook'

/* - React - */
import { useParams, useLocation } from 'react-router-dom'

/* | - Menu Folder Component - | */
/* MenuFolderComponent */
export const MenuFolderComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { idD } = useParams()
  const { profile } = useProfile()
  const { pathname } = useLocation()

  /* - Funcs - */
  const findIndex = (idD: string | undefined): number => {
    if (idD) {
      const index = profile.directories.findIndex((x) => x.id === parseInt(idD))
      return index
    }
    return 0
  }

  /* - Return - */
  if (idD === undefined) {
    return (
      <>
        <MenuComponent
          className={pathname.includes('/dashboard/main/inf') ? 'isActive' : ''}
          to={`/dashboard/main/inf`}
          icon={<HelpCenterOutlinedIcon />}
          iconColor="#fff"
          span="Información"
          fontColor="#fff"
        />
        <Divider variant="fullWidth" />
        {folderMain.map((link) => (
          <MenuComponent
            className={pathname.includes(`/dashboard/main/${link.to}`) ? 'isActive' : ''}
            key={'idF' + link.id}
            to={'/dashboard/main/' + link.to}
            icon={link.icon}
            iconColor="#fff"
            span={link.name}
            fontColor="#fff"
          />
        ))}
      </>
    )
  }

  return (
    <>
      <MenuComponent
        className={pathname.includes(`/dashboard/directory/${idD}/inf`) ? 'isActive' : ''}
        to={`/dashboard/directory/${idD}/inf`}
        icon={<HelpCenterOutlinedIcon />}
        iconColor="#fff"
        span="Información"
        fontColor="#fff"
      />
      <Divider variant="fullWidth" />
      {profile.directories[findIndex(idD)].folders.map((link) => (
        <MenuComponent
          className={
            pathname.includes(`/dashboard/directory/${idD}/folder/${link.id}`) ? 'isActive' : ''
          }
          key={link.id}
          to={`/dashboard/directory/${idD}/folder/${link.id}`}
          icon={<DynamicIconComponent icon={link.icon} />}
          iconColor={link.iconColor}
          span={link.name}
          fontColor={link.fontColor}
        />
      ))}
    </>
  )
}
