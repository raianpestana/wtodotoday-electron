/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import { SxProps } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

/* - Api - */
import { requestFolder } from '../../../../api/Folder.api'
import { AxiosError } from 'axios'

/* - React - */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../../../hooks/useNotification.hook.'
import { useProfile } from '../../../../hooks/useProfile.hook'

/* - Schema - */
import { AddFolderSchema } from '../../../../schemas/Dashboard/Folder/AddFolder.schema'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'

/* - Types - */
type AddFolderComponentType = {
  open: boolean
  handleClose: () => void
}

/* - Types - */
type AddFolderType = {
  name: string
}

/* | - Add Component - | */
/* AddFolderComponent */
export const AddFolderComponent: React.FC<AddFolderComponentType> = (prop): JSX.Element => {
  /* - Consts -*/
  /* React hook form with zod */
  const {
    reset,
    setFocus,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AddFolderType>({
    resolver: zodResolver(AddFolderSchema)
  })

  /* - Hooks - */
  const { idD } = useParams()
  const { profile, getDirectoryId, setFolder } = useProfile()
  const { setNotification } = useNotification()

  /* - Hooks - */
  useEffect((): void => {
    if (prop.open) {
      reset()
      const timer = setTimeout(() => {
        setFocus('name')
        return () => clearTimeout(timer)
      }, 100)
    }
  }, [prop.open])

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async (data) => {
    if (idD === undefined) {
      setNotification('error', 'La id del directorio no es correcto.', true)
      prop.handleClose()
      reset()
    } else {
      try {
        const resFolder = await requestFolder(idD, data.name)
        setFolder(idD, resFolder.data.folders)

        setNotification('success', 'La carpeta ha sido creado correctamente.', true)

        prop.handleClose()
        reset()
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response !== undefined) {
            //
          }
        }
      }
    }
  })

  /* - Return - */
  return (
    <Dialog open={prop.open} onClose={prop.handleClose} fullWidth>
      <DialogTitle>{'Crear carpeta'}</DialogTitle>
      <DialogContent dividers={true}>
        <FormAdd onSubmit={onSubmit} autoComplete="off" noValidate>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.5)" sx={{ fontSize: '12px' }}>
            {`${profile.directories[getDirectoryId(idD)].name}`}
          </Typography>
          <DialogContentText>{'Escriba el nombre de la nueva carpeta'}</DialogContentText>
          <TextField
            error={errors.name ? true : false}
            required
            label="Carpeta"
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.name?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('name')}
          />
          <GroupButtons>
            <Button onClick={prop.handleClose} color="error" variant="outlined" type="button">
              {'Cancelar'}
            </Button>
            <Button sx={sxButton} type="submit" disabled={!isValid || isSubmitting ? true : false}>
              {isSubmitting ? 'Creando...' : 'Crear carpeta'}
            </Button>
          </GroupButtons>
        </FormAdd>
      </DialogContent>
    </Dialog>
  )
}

/* | - Styled - | */
/* FormAdd */
const FormAdd = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`
/* GroupButtons */
const GroupButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  column-gap: 1rem;
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

const sxInput: SxProps = {
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.5)',

    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)'
    },

    '&.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.9)'
    }
  },

  '& .MuiOutlinedInput-root': {
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
