/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { SxProps } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

/* - Api - */
import { AxiosError } from 'axios'
import { deleteFolderApi } from '../../../../api/Folder.api'

/* - Hooks - */
import { useForm } from 'react-hook-form'
import { useProfile } from '../../../../hooks/useProfile.hook'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotification } from '../../../../hooks/useNotification.hook.'

/* - Types - */
type DeleteFolderComponentType = {
  open: boolean
  handleClose: () => void
}

/* | - Delete Folder Component - | */
/* DeleteFolderComponent */
export const DeleteFolderComponent: React.FC<DeleteFolderComponentType> = (prop): JSX.Element => {
  /* - Consts -*/
  /* React hook form with zod */
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  /* - Hooks - */
  const navigate = useNavigate()
  const { idD, idF } = useParams()
  const { profile, deleteFolder, getDirectoryId, getFolderId } = useProfile()
  const { setNotification } = useNotification()

  /* - Funcs - */
  /* onSubmit */
  const onSubmit = handleSubmit(async () => {
    if (idD !== undefined && idF !== undefined) {
      try {
        await deleteFolderApi(idD, idF)
        deleteFolder(idD, idF)

        setNotification('success', 'La carpeta ha sido eliminado correctamente.', true)

        navigate(`/dashboard/directory/${idD}/inf`)
        prop.handleClose()
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response !== undefined) {
            //
          }
        }
      }
    } else {
      setNotification('error', 'La ID del directorio o carpeta no existe.', true)
    }
  })

  /* - Return - */
  return (
    <>
      <Dialog open={prop.open} onClose={prop.handleClose} fullWidth>
        <DialogTitle>{'Eliminar carpeta'}</DialogTitle>
        <DialogContent>
          <FormAdd onSubmit={onSubmit} autoComplete="off" noValidate>
            <DialogContentText>
              {`¿Seguro que quiere eliminar la carpeta ${
                profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].name
              }?, esta acción no se puede deshacer.`}
            </DialogContentText>
            <GroupButtons>
              <Button onClick={prop.handleClose} color="error" variant="outlined" type="button">
                {'Cancelar'}
              </Button>
              <Button sx={sxButton} type="submit" disabled={isSubmitting ? true : false}>
                {isSubmitting ? 'Eliminando...' : 'Eliminar carpeta'}
              </Button>
            </GroupButtons>
          </FormAdd>
        </DialogContent>
      </Dialog>
    </>
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
