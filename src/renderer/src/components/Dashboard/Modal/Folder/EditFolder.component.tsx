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
import { listDynamicIcon } from '../../DynamicIcon.component'

/* - Api - */
import { AxiosError } from 'axios'
import { editFolderApi } from '../../../../api/Folder.api'

/* - Hooks - */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../../../hooks/useNotification.hook.'
import { FolderProfileType, useProfile } from '../../../../hooks/useProfile.hook'

/* - Schema - */
import { EditFolderSchema } from '../../../../schemas/Dashboard/Folder/EditFolder.schema'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'

/* - Types - */
type EditFolderComponentType = {
  open: boolean
  handleClose: () => void
}

/* - Types - */
type EditFolderType = {
  name: string
  icon: string
  description: string
  information: string
}

/* | - Edit Folder Component - | */
/* EditFolderComponent */
export const EditFolderComponent: React.FC<EditFolderComponentType> = (prop): JSX.Element => {
  /* - Hooks - */
  const { idD, idF } = useParams()
  const { profile, editFolder, getDirectoryId, getFolderId } = useProfile()
  const { setNotification } = useNotification()

  /* React hook form with zod */
  const {
    reset,
    setFocus,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EditFolderType>({
    resolver: zodResolver(EditFolderSchema)
  })

  useEffect((): void => {
    if (prop.open) {
      reset()
      const timer = setTimeout(() => {
        setFocus('name')
        setValue(
          'icon',
          profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].icon
        )
        return () => clearTimeout(timer)
      }, 100)
    }
  }, [prop.open])

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async (data) => {
    if (idD !== undefined && idF !== undefined) {
      try {
        await editFolderApi(idD, idF, data)
        editFolder(idD, idF, data as FolderProfileType)

        setNotification('success', 'La carpeta ha sido editado correctamente.', true)

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
      <DialogTitle>{'Editar carpeta'}</DialogTitle>
      <DialogContent dividers={true}>
        <FormAdd onSubmit={onSubmit} autoComplete="off" noValidate>
          <TextField
            error={errors.name ? true : false}
            required
            inputProps={{ maxLength: 11 }}
            label="Carpeta"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={
              profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].name
            }
            helperText={errors.name?.message}
            sx={sxInput}
            /* Reack hook form */
            {...register('name')}
          />
          <Autocomplete
            disablePortal
            value={profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].icon}
            options={listDynamicIcon}
            renderInput={(params): JSX.Element => (
              <TextField {...params} sx={sxInput} label="Icono" required {...register('icon')} />
            )}
          />
          <TextField
            error={errors.description ? true : false}
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={
              profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].description
            }
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
            defaultValue={
              profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].information
            }
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
              {isSubmitting ? 'Guardando cambios...' : 'Editar carpeta'}
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
