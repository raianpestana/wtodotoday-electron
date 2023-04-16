/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

/* - @mui/icons-material - */
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'

/* - Components - */
import { AddDirectoryComponent } from '../../Modal/Directory/AddDirectory.component'

/* - Hooks - */
import { useGlobalStyle } from '../../../../hooks/useGlobalStyle.hook'
import { useState } from 'react'

/* - Types - */
type IconDivType = {
  size: number
}

/* | - ButtonAddDirectory Component - | */
/* ButtonAddDirectoryComponent */
export const ButtonAddDirectoryComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()

  const [open, setOpen] = useState(false)

  /* - Handle - */
  /* handleClickOpen */
  const handleClickOpen = (): void => {
    setOpen(true)
  }

  /* handleClose */
  const handleClose = (): void => {
    setOpen(false)
  }

  /* - Return - */
  return (
    <>
      <Tooltip title="Crear directorio" TransitionComponent={Zoom} placement="right">
        <IconButton
          onClick={handleClickOpen}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            paddingRight: '11px',
            paddingButtonAddDirectory: '11px',
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: 'rgba(255, 255, 255, 0.09)',
            border: '1px solid rgba(255, 255, 255, 0.01)',
            transition: '0.3s',
            animation: 'mymove 3s infinite',

            '@keyframes mymove': {
              '50%': {
                borderRadius: '45%',
                scale: '1.03',
                borderColor: 'rgba(255, 255, 255, 0.05)'
              }
            },

            svg: {
              fill: 'rgb(255, 255, 255, 0.5)'
            },

            '.MuiTouchRipple-child': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            },

            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              svg: {
                fill: 'rgb(255, 255, 255, 0.8)'
              }
            },

            '&:active': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              svg: {
                fill: 'rgb(255, 255, 255, 0.9)'
              }
            }
          }}
        >
          <IconDiv size={CSS.nav.button.size}>
            <AddLinkOutlinedIcon />
          </IconDiv>
        </IconButton>
      </Tooltip>
      <AddDirectoryComponent open={open} handleClose={handleClose} />
    </>
  )
}

/* | - Styled - | */
/* IconDiv */
const IconDiv = styled.div<IconDivType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  svg {
    width: ${(p): string => `${p.size}px`};
    height: ${(p): string => `${p.size}px`};
  }
`
