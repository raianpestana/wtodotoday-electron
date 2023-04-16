/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Button from '@mui/material/Button'

/* | - ButtonForm Component - | */
/* - ButtonFormComponent - */
export const ButtonFormComponent = styled(Button)`
  display: flex;
  padding: 8px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  transition: 0.5s;
  text-transform: none;

  &:active,
  :focus,
  :hover {
    color: rgba(255, 255, 255, 0.6);
    background-color: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.1;
  }
`
