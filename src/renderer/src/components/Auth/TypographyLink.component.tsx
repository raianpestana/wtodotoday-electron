/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Typography from '@mui/material/Typography'

/* | - Typography Link Component - | */
/* - TypographyLinkComponent - */
export const TypographyLinkComponent = styled(Typography)`
  text-align: center;
  color: rgba(255, 255, 255, 0.15);
  transition: 0.5s;
  cursor: pointer;

  &:active,
  :focus,
  :hover {
    color: rgba(255, 255, 255, 0.3);
    text-decoration: underline;
  }
`
