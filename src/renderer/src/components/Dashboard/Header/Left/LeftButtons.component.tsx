/* | - Imports - | */
/* - React - */
import { useState } from 'react'

/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

/* - @mui/icons-material - */
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'

/* - Hooks - */
import { useGlobalStyle } from '../../../../hooks/useGlobalStyle.hook'
import { useProfile } from '../../../../hooks/useProfile.hook'

/* | - Left Buttons Component - | */
/* LeftButtonsComponent */
export const LeftButtonsComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { profile } = useProfile()
  const { CSS, func } = useGlobalStyle()
  const [headerLeftButton, setHeaderLeftButton] = useState<string | null>()

  /* - Funcs - */
  const handleHeaderLeftButton = (
    _event: React.MouseEvent<HTMLElement>,
    newHeaderLeftButton: string | null
  ): void => {
    setHeaderLeftButton(newHeaderLeftButton)
    func.toggleMenu(newHeaderLeftButton === 'ToggleMenu')
  }

  /* - Return - */
  return (
    <StyledToggleButtonGroup
      value={headerLeftButton}
      exclusive={true}
      onChange={handleHeaderLeftButton}
      aria-label="HeaderLeftButtons"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)'
        },
        svg: {
          fill: 'rgb(255, 255, 255, 0.5)',
          width: `${CSS.header.button.size}px`,
          height: `${CSS.header.button.size}px`
        }
      }}
    >
      <ToggleButton
        value="ToggleMenu"
        aria-label="ToggleMenu"
        disabled={profile.directories.length <= 0}
      >
        <MenuOpenOutlinedIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  )
}

/* | - Styled - | */
/* StyledToggleButtonGroup */
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  display: 'flex',
  columnGap: '8px',

  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    paddingRight: '11px',
    paddingBottom: '11px',
    width: 'fit-content',
    height: 'fit-content',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      svg: {
        fill: 'rgb(255, 255, 255, 0.8)'
      }
    },
    '&.Mui-disabled': {
      border: 0,
      svg: {
        fill: 'rgb(255, 255, 255, 0.1)'
      }
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      svg: {
        fill: 'rgb(255, 255, 255, 0.9)'
      }
    },
    '&:not(:first-of-type)': {
      borderRadius: '50%'
    },
    '&:first-of-type': {
      borderRadius: '50%'
    }
  }
}))
