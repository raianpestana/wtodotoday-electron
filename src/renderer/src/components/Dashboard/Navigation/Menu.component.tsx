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
  iconColor: string
  span: string
  fontColor: string
  to: string
}

type IconDivType = {
  size: number
  iconColor: string
}

type SpanDivType = {
  fontColor: string
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
        <IconDiv size={CSS.nav.button.size} iconColor={prop.iconColor}>
          {prop.icon}
        </IconDiv>
      </ButtonLink>
    )

  /* !isOnlyIcons */
  return (
    <ButtonLink
      className={prop.className}
      to={prop.to}
      style={{ borderRadius: CSS.nav.isOnlyIcons ? '50%' : '8px' }}
    >
      <IconDiv size={CSS.nav.button.size} iconColor={prop.iconColor}>
        {prop.icon}
      </IconDiv>
      <SpanDiv fontColor={prop.fontColor}>
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
    fill: ${(p): string => p.iconColor};
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
  opacity: 0.5;

  &.isActive {
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.08);
    opacity: 0.8;
  }

  :focus {
    background-color: rgba(255, 255, 255, 0.08);
    outline: none;
    opacity: 0.8;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.05);
    outline: none;
    opacity: 0.7;
  }
`

/* SpanDiv */
const SpanDiv = styled.div<SpanDivType>`
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 2px;
  overflow: hidden;
  color: ${(p): string => p.fontColor};
`
