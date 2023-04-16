/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Divider from '@mui/material/Divider'

/* - Components - */
import { MenuComponent } from '../Menu.component'
import { DynamicIconComponent } from '../../DynamicIcon.component'

/* - Hooks - */
import { useProfile } from '../../../../hooks/useProfile.hook'
import { useLocation } from 'react-router-dom'

/* | - Menu Directory Component - | */
/* MenuDirectoryComponent */
export const MenuDirectoryComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { profile } = useProfile()
  const { pathname } = useLocation()

  /* - Return - */
  return (
    <>
      <MenuComponent
        className={pathname.includes('/dashboard/main') ? 'isActive' : ''}
        to={'/dashboard/main/inf'}
        icon={<DynamicIconComponent icon="Casa" />}
        span="Principal"
      />
      <Divider variant="fullWidth" />
      {profile.directories.length <= 0 && (
        <AlertDirectoryVoid>
          {'No hay directorios. Cree uno en la esquina inferior en la parte izquierda.'}
        </AlertDirectoryVoid>
      )}
      {profile.directories.length > 0 &&
        profile.directories.map((link) => (
          <MenuComponent
            className={pathname.includes('/dashboard/directory/' + link.id) ? 'isActive' : ''}
            key={'idD' + link.id}
            to={'/dashboard/directory/' + link.id + '/inf'}
            icon={<DynamicIconComponent icon={link.icon} />}
            span={link.name}
          />
        ))}
    </>
  )
}

/* AlertDirectoryVoid */
const AlertDirectoryVoid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.3);
`
