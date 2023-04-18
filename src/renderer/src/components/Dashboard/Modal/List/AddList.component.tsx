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
import Autocomplete from '@mui/material/Autocomplete'
import { listDynamicIcon } from '../../DynamicIcon.component'
import Typography from '@mui/material/Typography'

/* - Api - */
import { AxiosError } from 'axios'
import { requestList } from '../../../../api/List.api'

/* - React - */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../../../hooks/useNotification.hook.'
import { useProfile } from '../../../../hooks/useProfile.hook'

/* - Schema - */
import { AddListSchema } from '../../../../schemas/Dashboard/List/AddList.schema'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'

/* - Types - */
type AddListComponentType = {
  open: boolean
  handleClose: () => void
  state: string
}

/* - Types - */
type AddListType = {
  name: string
  icon: string
  description: string
  state: string
}

/* | - Add Component - | */
/* AddListComponent */
export const AddListComponent: React.FC<AddListComponentType> = (prop): JSX.Element => {
  /* - Consts -*/
  /* React hook form with zod */
  const {
    reset,
    setFocus,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddListType>({
    resolver: zodResolver(AddListSchema)
  })

  /* - Hooks - */
  const { idD, idF } = useParams()
  const { profile, getDirectoryId, getFolderId, setList } = useProfile()
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
    if (idD !== undefined && idF !== undefined) {
      try {
        const resList = await requestList(idD, idF, data)
        setList(idD, idF, resList.data.lists)

        setNotification('success', 'La lista ha sido creado correctamente.', true)

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
      <DialogTitle>{'Crear lista'}</DialogTitle>
      <DialogContent dividers={true}>
        <FormAdd onSubmit={onSubmit} autoComplete="off" noValidate>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.5)" sx={{ fontSize: '12px' }}>
            {`${profile.directories[getDirectoryId(idD)].name} / ${
              profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].name
            }`}
          </Typography>
          <DialogContentText>{'Escriba el nombre de la nueva lista'}</DialogContentText>
          <TextField
            error={errors.name ? true : false}
            required
            label="Lista"
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.name?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('name')}
          />
          <Autocomplete
            disablePortal
            options={listDynamicIcon}
            renderInput={(params): JSX.Element => (
              <TextField {...params} sx={sxInput} label="Icono" {...register('icon')} />
            )}
          />
          <TextField
            error={errors.description ? true : false}
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.description?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('description')}
          />
          <input type="hidden" value={prop.state} {...register('state')} />
          <GroupButtons>
            <Button onClick={prop.handleClose} color="error" variant="outlined" type="button">
              {'Cancelar'}
            </Button>
            <Button sx={sxButton} type="submit" disabled={isSubmitting ? true : false}>
              {isSubmitting ? 'Creando...' : 'Crear Lista'}
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
