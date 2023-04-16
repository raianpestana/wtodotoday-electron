/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import IconButton from '@mui/material/IconButton'
import { SxProps } from '@mui/material'

/* - @mui/icons-material - */
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

/* - Hooks - */
import { useProfile } from '../../../hooks/useProfile.hook'

/* - Hooks - */
import { useParams } from 'react-router-dom'
import { useGlobalStyle } from '../../../hooks/useGlobalStyle.hook'
import { useState } from 'react'

/* - Components -*/
import { DeleteDirectoryComponent } from '../../../components/Dashboard/Modal/Directory/DeleteDirectory.component'
import { DynamicIconComponent } from '../../../components/Dashboard/DynamicIcon.component'
import { EditDirectoryComponent } from '../../../components/Dashboard/Modal/Directory/EditDirectory.component'

/* - Types - */
type IconDivType = {
  size: number
}

/* | - Inf Page - | */
/* InfPage */
export const InfPage: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()
  const { idD } = useParams()
  const { profile, getDateString, getDirectoryId } = useProfile()

  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  /* - Handle - */
  /* handleClickOpenDelete */
  const handleClickOpenDelete = (): void => {
    setOpenDelete(true)
  }

  /* handleClickOpenEdit */
  const handleClickOpenEdit = (): void => {
    setOpenEdit(true)
  }

  /* handleClose */
  const handleClose = (): void => {
    setOpenDelete(false)
    setOpenEdit(false)
  }

  /* - Return - */
  return (
    <InfStyled>
      <InfTopStyled>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="none" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
            <DashboardOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Dashboard'}
          </Link>
          <Link underline="none" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
            <LinkOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Directorio'}
          </Link>
          <Link underline="none" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
            <NumbersOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {idD}
          </Link>
          <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <InfoOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Información'}
          </Typography>
        </Breadcrumbs>
        <InfTopButtonsStyled>
          {/* edit */}
          <Tooltip title="Editar directorio" TransitionComponent={Zoom} placement="bottom">
            <IconButton onClick={handleClickOpenEdit} sx={sxIconButton}>
              <IconDiv size={CSS.nav.button.size}>
                <DriveFileRenameOutlineIcon />
              </IconDiv>
            </IconButton>
          </Tooltip>
          <EditDirectoryComponent open={openEdit} handleClose={handleClose} />

          {/* delete */}
          <Tooltip title="Eliminar directorio" TransitionComponent={Zoom} placement="bottom">
            <IconButton onClick={handleClickOpenDelete} sx={sxIconButton}>
              <IconDiv size={CSS.nav.button.size}>
                <DeleteOutlineOutlinedIcon />
              </IconDiv>
            </IconButton>
          </Tooltip>
          <DeleteDirectoryComponent open={openDelete} handleClose={handleClose} />
        </InfTopButtonsStyled>
      </InfTopStyled>

      <Card variant="outlined">
        <CardContent>
          <StatsDateStyled>
            <Typography sx={{ mb: 0.5, fontSize: '10px' }} color="rgba(255, 255, 255, 0.3)">
              {'Creado el: ' + getDateString(profile.directories[getDirectoryId(idD)].createdDate)}
            </Typography>
            <Typography sx={{ mb: 0.5, fontSize: '10px' }} color="rgba(255, 255, 255, 0.3)">
              {'Última actualización: ' +
                getDateString(profile.directories[getDirectoryId(idD)].updatedAt)}
            </Typography>
          </StatsDateStyled>

          <StatsNameStyled>
            <DynamicIconComponent icon={profile.directories[getDirectoryId(idD)].icon} />
            <Typography
              variant="h5"
              sx={{ mb: 0.3, marginTop: '4px' }}
              color="rgba(255, 255, 255, 0.7)"
            >
              {profile.directories[getDirectoryId(idD)].name}
            </Typography>
          </StatsNameStyled>

          {profile.directories[getDirectoryId(idD)].description && (
            <Typography sx={{ mb: 2, fontSize: '12px' }} color="rgba(255, 255, 255, 0.5)">
              {profile.directories[getDirectoryId(idD)].description}
            </Typography>
          )}
          {profile.directories[getDirectoryId(idD)].information && (
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              {profile.directories[getDirectoryId(idD)].information}
            </Typography>
          )}
        </CardContent>
      </Card>
    </InfStyled>
  )
}

/* | - Styled - | */
/* InfStyled */
const InfStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 1rem;
`

/* InfTopStyled */
const InfTopStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
`

const InfTopButtonsStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`

/* StatsDateStyled */
const StatsDateStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 8px;
`

const StatsNameStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  color: rgba(255, 255, 255, 0.7);
`

/* IconDiv */
const IconDiv = styled.div<IconDivType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  svg {
    width: ${(p): string => `${p.size}px`};
    height: ${(p): string => `${p.size}px`};
  }
`

const sxIconButton: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  paddingRight: '11px',
  paddingButtonAddDirectory: '11px',
  width: 'fit-content',
  height: 'fit-content',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.07)',

  svg: {
    fill: 'rgb(255, 255, 255, 0.5)'
  },

  '.MuiTouchRipple-child': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    svg: {
      fill: 'rgb(255, 255, 255, 0.8)'
    }
  },

  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    svg: {
      fill: 'rgb(255, 255, 255, 0.9)'
    }
  }
}
