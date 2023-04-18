/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { SxProps } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'

/* - @mui/icons-material - */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

/* - Api - */
import { AxiosError } from 'axios'
import { editAccountApi } from '../../../../api/Account.api'

/* - Hooks - */
import { useForm } from 'react-hook-form'
import { useNotification } from '../../../../hooks/useNotification.hook.'

/* - Schema - */
import { EditAccountSchema } from '../../../../schemas/Dashboard/Account/EditAccount.schema'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

/* - Types - */
type EditAccountComponentType = {
  open: boolean
  handleClose: () => void
}

/* - Types - */
type EditAccountType = {
  password: string
}

/* | - Edit Component - | */
/* EditAccountComponent */
export const EditAccountComponent: React.FC<EditAccountComponentType> = (prop): JSX.Element => {
  /* React hook form with zod */
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EditAccountType>({
    resolver: zodResolver(EditAccountSchema)
  })

  /* - Hooks - */
  const { setNotification } = useNotification()

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async (data) => {
    try {
      await editAccountApi(data)

      setNotification('success', 'La cuenta ha sido editada correctamente.', true)

      prop.handleClose()
      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          setNotification('error', error.response.data.message, true)
        }
      }
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  /* - Return - */
  return (
    <Dialog open={prop.open} onClose={prop.handleClose} scroll="paper" fullWidth>
      <DialogTitle>{'Editar cuenta'}</DialogTitle>
      <DialogContent dividers={true}>
        <FormEdit onSubmit={onSubmit} autoComplete="off" noValidate>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{'Cambiar contraseña'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={sxLabel} htmlFor="outlined-adornment-password">
                  {'Nueva contraseña'}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  error={errors.password ? true : false}
                  sx={sxInputOutlined}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  /* Reack hook form */
                  {...register('password')}
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <GroupButtons>
            <Button onClick={prop.handleClose} color="error" variant="outlined" type="button">
              {'Cancelar'}
            </Button>
            <Button sx={sxButton} type="submit" disabled={isSubmitting ? true : false}>
              {isSubmitting ? 'Guardando cambios...' : 'Editar cuenta'}
            </Button>
          </GroupButtons>
        </FormEdit>
      </DialogContent>
    </Dialog>
  )
}

/* | - Styled - | */
/* FormEdit */
const FormEdit = styled.form`
  display: flex;
  flex-direction: column;
`
/* GroupButtons */
const GroupButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  column-gap: 1rem;
  padding-top: 1rem;
`
const sxButton: SxProps = {
  display: 'flex',
  padding: '8px',
  color: 'rgba(255, 255, 255, 0.5)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: '0.3s',
  textTransform: 'none',

  '.MuiTouchRipple-child': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },

  '&:hover': {
    color: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },

  '&:active': {
    color: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },

  '&:disabled': {
    color: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.01)'
  }
}

const sxLabel: SxProps = {
  '&.Mui-focused': {
    color: 'rgba(255, 255, 255, 0.9)'
  }
}

const sxInputOutlined: SxProps = {
  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.6)'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.6)'
    }
  }
}
