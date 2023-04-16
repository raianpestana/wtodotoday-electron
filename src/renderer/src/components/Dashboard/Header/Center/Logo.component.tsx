/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/icons-material - */
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Avatar from '@mui/material/Avatar'
import LogoPNG from '../../../../assets/images/logo.png'

/* | - Center Logo Component - | */
/* CenterLogoComponent */
export const CenterLogoComponent: React.FC = (): JSX.Element => {
  /* - Return - */
  return (
    <Tooltip title="<todo.today/>" TransitionComponent={Zoom} placement="bottom">
      <IconDirectoryDiv>
        <Avatar src={LogoPNG} />
      </IconDirectoryDiv>
    </Tooltip>
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
  width: fit-content;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
`
