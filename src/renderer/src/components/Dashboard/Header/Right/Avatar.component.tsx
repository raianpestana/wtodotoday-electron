/* | - Imports - | */
/* - @emotion/styled - */
// import styled from '@emotion/styled'

/* - @mui/icons-material - */
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Avatar from '@mui/material/Avatar'

/* - Hooks - */
import { useProfile } from '../../../../hooks/useProfile.hook'

/* | - Center Avatar Component - | */
/* CenterAvatarComponent */
export const CenterAvatarComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { profile } = useProfile()

  /* - Return - */
  return (
    <Tooltip title={profile.username.toUpperCase()} TransitionComponent={Zoom} placement="left">
      <Avatar>{profile.username[0].toUpperCase()}</Avatar>
    </Tooltip>
  )
}
