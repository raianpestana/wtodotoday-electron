/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Divider from '@mui/material/Divider'

/* | - Divider Component - | */
/* - DividerComponent - */
export const DividerComponent = styled(Divider)`
  color: rgba(255, 255, 255, 0.1);

  &::before,
  ::after {
    border-color: rgba(255, 255, 255, 0.07);
  }
`
