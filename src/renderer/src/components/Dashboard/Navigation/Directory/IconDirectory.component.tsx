/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/icons-material - */
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

/* - Hooks - */
import { useGlobalStyle } from '../../../../hooks/useGlobalStyle.hook'

/* - Types - */
type IconDivType = {
  size: number
}

/* | - IconDirectory Component - | */
/* IconDirectoryComponent */
export const IconDirectoryComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()

  /* - Return - */
  return (
    <IconDirectoryDiv>
      <IconDiv size={CSS.nav.button.size}>
        <LinkOutlinedIcon />
      </IconDiv>
    </IconDirectoryDiv>
  )
}

/* | - Styled - | */
/* IconDirectoryDiv */
const IconDirectoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  column-gap: 8px;
  padding: 10px;
  padding-right: 11px;
  padding-bottom: 11px;
  width: fit-content;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
`

/* IconDiv */
const IconDiv = styled.div<IconDivType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  svg {
    fill: rgb(255, 255, 255, 0.85);
    width: ${(p): string => `${p.size}px`};
    height: ${(p): string => `${p.size}px`};
  }
`
