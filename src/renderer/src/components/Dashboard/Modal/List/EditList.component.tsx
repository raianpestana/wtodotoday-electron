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
import Typography from '@mui/material/Typography'

/* - Api - */
import { AxiosError } from 'axios'
import { editListApi } from '../../../../api/List.api'

/* - Hooks - */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNotification } from '../../../../hooks/useNotification.hook.'
import { ListProfileType, useProfile } from '../../../../hooks/useProfile.hook'

/* - Schema - */
import { EditListSchema } from '../../../../schemas/Dashboard/List/EditList.schema'

/* - Zod - */
import { zodResolver } from '@hookform/resolvers/zod'

/* - Types - */
type EditListComponentType = {
  open: boolean
  idL: number
  handleClose: () => void
}

/* - Types - */
type EditListType = {
  name: string
  icon: string
  description: string
  information: string
  state: string
}

/* | - Edit List Component - | */
/* EditListComponent */
export const EditListComponent: React.FC<EditListComponentType> = (prop): JSX.Element => {
  /* - Consts -*/
  const listState = ['Pendiente', 'En proceso', 'Completado']

  /* - Hooks - */
  const { idD, idF } = useParams()
  const { profile, editList, getDirectoryId, getFolderId, getListId } = useProfile()
  const { setNotification } = useNotification()

  /* React hook form with zod */
  const {
    reset,
    setFocus,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EditListType>({
    resolver: zodResolver(EditListSchema)
  })

  useEffect((): void => {
    if (prop.open) {
      reset()
      const timer = setTimeout(() => {
        setFocus('name')
        setValue(
          'icon',
          profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
            getListId(idD, idF, prop.idL.toString())
          ].icon
        )
        setValue(
          'state',
          profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
            getListId(idD, idF, prop.idL.toString())
          ].state
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
        await editListApi(idD, idF, prop.idL.toString(), data)
        editList(idD, idF, prop.idL.toString(), data as ListProfileType)

        setNotification('success', 'La lista ha sido editado correctamente.', true)

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
      <DialogTitle>{'Editar lista'}</DialogTitle>
      <DialogContent dividers={true}>
        <FormAdd onSubmit={onSubmit} autoComplete="off" noValidate>
          {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
            getListId(idD, idF, prop.idL.toString())
          ] && (
            <>
              <Typography
                variant="body1"
                color="rgba(255, 255, 255, 0.5)"
                sx={{ fontSize: '12px' }}
              >
                {`${profile.directories[getDirectoryId(idD)].name} / ${
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].name
                } / ${
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
                    getListId(idD, idF, prop.idL.toString())
                  ].name
                }`}
              </Typography>
              <TextField
                error={errors.name ? true : false}
                required
                inputProps={{ maxLength: 11 }}
                label="Lista"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
                    getListId(idD, idF, prop.idL.toString())
                  ].name
                }
                helperText={errors.name?.message}
                sx={sxInput}
                /* Reack hook form */
                {...register('name')}
              />
              <Autocomplete
                id="icon"
                disablePortal
                defaultValue={
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
                    getListId(idD, idF, prop.idL.toString())
                  ].icon
                }
                options={listDynamicIcon}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    sx={sxInput}
                    label="Icono"
                    required
                    {...register('icon')}
                  />
                )}
              />
              <Autocomplete
                id="state"
                disablePortal
                defaultValue={
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
                    getListId(idD, idF, prop.idL.toString())
                  ].state
                }
                options={listState}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    sx={sxInput}
                    label="Estado"
                    required
                    {...register('state')}
                  />
                )}
              />
              <TextField
                error={errors.description ? true : false}
                label="Descripción"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
                    getListId(idD, idF, prop.idL.toString())
                  ].description
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
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists[
                    getListId(idD, idF, prop.idL.toString())
                  ].information
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
                  {isSubmitting ? 'Guardando cambios...' : 'Editar lista'}
                </Button>
              </GroupButtons>
            </>
          )}
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
