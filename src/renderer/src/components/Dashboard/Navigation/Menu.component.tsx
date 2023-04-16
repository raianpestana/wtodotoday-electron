/* | - Imports - | */
/* - React - */
import { NavLink } from 'react-router-dom'

/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Typography from '@mui/material/Typography'

/* - Hooks - */
import { useGlobalStyle } from '../../../hooks/useGlobalStyle.hook'

/* - Types - */
type MenuComponentType = {
  className: string
  icon: JSX.Element
  span: string
  to: string
}

type IconDivType = {
  size: number
}

/* | - Menu Component - | */
/* MenuComponent */
export const MenuComponent: React.FC<MenuComponentType> = (prop): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()

  /* - Return - */
  /* isOnlyIcons */
  if (CSS.nav.isOnlyIcons)
    return (
      <ButtonLink
        className={prop.className}
        to={prop.to}
        style={{ borderRadius: CSS.nav.isOnlyIcons ? '50%' : '8px' }}
      >
        <IconDiv size={CSS.nav.button.size}>{prop.icon}</IconDiv>
      </ButtonLink>
    )

  /* !isOnlyIcons */
  return (
    <ButtonLink
      className={prop.className}
      to={prop.to}
      style={{ borderRadius: CSS.nav.isOnlyIcons ? '50%' : '8px' }}
    >
      <IconDiv size={CSS.nav.button.size}>{prop.icon}</IconDiv>
      <SpanDiv>
        <Typography sx={{ fontSize: `${CSS.nav.button.size - 6}px`, fontWeight: '400' }}>
          {prop.span}
        </Typography>
      </SpanDiv>
    </ButtonLink>
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

/* ButtonLink */
const ButtonLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  column-gap: 8px;
  padding: 10px;
  padding-right: 11px;
  padding-bottom: 11px;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  text-decoration: none;
  text-transform: none;
  color: rgb(255, 255, 255, 0.5);

  svg {
    fill: rgb(255, 255, 255, 0.5);
  }

  &.isActive {
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.07);
    color: rgb(255, 255, 255, 0.7);
    svg: {
      fill: rgb(255, 255, 255, 0.9);
    }
  }

  :hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.05);
    color: rgb(255, 255, 255, 0.7);
    outline: none;
    svg: {
      fill: rgb(255, 255, 255, 0.8);
    }
  }
`

/* SpanDiv */
const SpanDiv = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 2px;
  overflow: hidden;
`
