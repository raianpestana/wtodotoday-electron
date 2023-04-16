/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import TextField from '@mui/material/TextField'

/* | - TextField Component - | */
/* - TextFieldComponent - */
export const TextFieldComponent = styled(TextField)`
  & .MuiInputBase-input {
    color: rgba(255, 255, 255, 0.3);
  }

  & .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.3);

    &:hover {
      color: rgba(255, 255, 255, 0.5);
    }

    &.Mui-focused {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-width: 1px;
      border-color: rgba(255, 255, 255, 0.07);
    }

    &:hover fieldset,
    &.Mui-focused fieldset {
      border-width: 1px;
      border-color: rgba(255, 255, 255, 0.15);
    }
  }
`
