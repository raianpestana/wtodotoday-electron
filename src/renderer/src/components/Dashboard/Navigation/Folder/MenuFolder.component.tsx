/* | - Imports - | */
/* - @mui/material - */
import Divider from '@mui/material/Divider'

/* - @mui/icons-material - */
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";

/* - Components - */
import { MenuComponent } from '../Menu.component'
import { DynamicIconComponent } from '../../DynamicIcon.component'

const folderMain = [
  {
    id: 1,
    name: 'Cuenta',
    to: 'account',
    icon: <ManageAccountsOutlinedIcon />
  }
  // {
  //   id: 2,
  //   name: "Ajustes",
  //   to: "settings",
  //   icon: <SettingsOutlinedIcon />,
  // },
  // { id: 3, name: "Diseño", to: "design", icon: <DesignServicesOutlinedIcon /> },
  // { id: 4, name: "Acerca de", to: "about", icon: <InfoOutlinedIcon /> },
  // {
  //   id: 5,
  //   name: "Actualizar",
  //   to: "updates",
  //   icon: <UpgradeOutlinedIcon />,
  // },
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
          span="Información"
        />
        <Divider variant="fullWidth" />
        {folderMain.map((link) => (
          <MenuComponent
            className={pathname.includes(`/dashboard/main/${link.to}`) ? 'isActive' : ''}
            key={'idF' + link.id}
            to={'/dashboard/main/' + link.to}
            icon={link.icon}
            span={link.name}
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
        span="Información"
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
          span={link.name}
        />
      ))}
    </>
  )
}
