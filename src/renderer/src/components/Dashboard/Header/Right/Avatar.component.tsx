/* | - Imports - | */
/* - @emotion/styled - */
// import styled from '@emotion/styled'

/* - @mui/icons-material - */
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

/* - Hooks - */
import { useProfile } from '../../../../hooks/useProfile.hook'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth.hook'

/* | - Center Avatar Component - | */
/* CenterAvatarComponent */
export const CenterAvatarComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { profile, voidProfile } = useProfile()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  /* - Return - */
  return (
    <>
      <Tooltip title={profile.username.toUpperCase()} TransitionComponent={Zoom} placement="left">
        <IconButton aria-label="account" onClick={handleClick}>
          <Avatar>{profile.username[0].toUpperCase()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={(): void => {
            logout()
            voidProfile()
            navigate('/')
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  )
}
