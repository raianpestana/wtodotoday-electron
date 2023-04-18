/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import { SxProps } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Autocomplete from '@mui/material/Autocomplete'

/* - Api - */
import { AxiosError } from 'axios'

/* - Hooks - */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../../../hooks/useNotification.hook.'
import { DirectoryProfileType, useProfile } from '../../../../hooks/useProfile.hook'

/* - Schema - */
import { EditDirectorySchema } from '../../../../schemas/Dashboard/Directory/EditDirectory.schema'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'
import { editDirectoryApi } from '../../../../api/Directory.api'
import { listDynamicIcon } from '../../DynamicIcon.component'

/* - Types - */
type EditDirectoryComponentType = {
  open: boolean
  handleClose: () => void
}

/* - Types - */
type EditDirectoryType = {
  name: string
  icon: string
  iconColor: string
  fontColor: string
  description: string
  information: string
}

/* | - Edit Component - | */
/* EditDirectoryComponent */
export const EditDirectoryComponent: React.FC<EditDirectoryComponentType> = (prop): JSX.Element => {
  /* - Hooks - */
  const { idD } = useParams()
  const { profile, editDirectory, getDirectoryId } = useProfile()
  const { setNotification } = useNotification()

  /* React hook form with zod */
  const {
    reset,
    setFocus,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EditDirectoryType>({
    resolver: zodResolver(EditDirectorySchema)
  })

  useEffect((): void => {
    if (prop.open) {
      reset()
      const timer = setTimeout(() => {
        setFocus('name')
        setValue('icon', profile.directories[getDirectoryId(idD)].icon)
        return () => clearTimeout(timer)
      }, 100)
    }
  }, [prop.open])

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async (data) => {
    if (idD !== undefined) {
      try {
        await editDirectoryApi(idD, data)
        editDirectory(idD, data as DirectoryProfileType)

        setNotification('success', 'El directorio ha sido editado correctamente.', true)

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
    <Dialog open={prop.open} onClose={prop.handleClose} scroll="paper" fullWidth>
      <DialogTitle>{'Editar directorio'}</DialogTitle>
      <DialogContent dividers={true}>
        <FormAdd onSubmit={onSubmit} autoComplete="off" noValidate>
          <TextField
            error={errors.name ? true : false}
            required
            inputProps={{ maxLength: 11 }}
            label="Directorio"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={profile.directories[getDirectoryId(idD)].name}
            helperText={errors.name?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('name')}
          />
          <Autocomplete
            disablePortal
            defaultValue={profile.directories[getDirectoryId(idD)].icon}
            options={listDynamicIcon}
            renderInput={(params): JSX.Element => (
              <TextField {...params} sx={sxInput} label="Icono" required {...register('icon')} />
            )}
          />

          <TextField
            error={errors.iconColor ? true : false}
            label="Color del icono"
            type="color"
            fullWidth
            variant="outlined"
            defaultValue={profile.directories[getDirectoryId(idD)].iconColor}
            helperText={errors.iconColor?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('iconColor')}
          />

          <TextField
            error={errors.fontColor ? true : false}
            label="Color del texto"
            type="color"
            fullWidth
            variant="outlined"
            defaultValue={profile.directories[getDirectoryId(idD)].fontColor}
            helperText={errors.fontColor?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('fontColor')}
          />

          <TextField
            error={errors.description ? true : false}
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={profile.directories[getDirectoryId(idD)].description}
            helperText={errors.description?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('description')}
          />
          <TextField
            error={errors.information ? true : false}
            label="Información"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            defaultValue={profile.directories[getDirectoryId(idD)].information}
            helperText={errors.information?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('information')}
          />
          <GroupButtons>
            <Button onClick={prop.handleClose} color="error" variant="outlined" type="button">
              {'Cancelar'}
            </Button>
            <Button sx={sxButton} type="submit" disabled={isSubmitting ? true : false}>
              {isSubmitting ? 'Guardando cambios...' : 'Editar directorio'}
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
