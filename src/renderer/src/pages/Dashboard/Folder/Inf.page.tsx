/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
// import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import IconButton from '@mui/material/IconButton'
import { SxProps } from '@mui/material'

/* - @mui/icons-material - */
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

/* - Hooks - */
import { useProfile } from '../../../hooks/useProfile.hook'
import { useParams } from 'react-router-dom'
import { useGlobalStyle } from '../../../hooks/useGlobalStyle.hook'
import { useState } from 'react'

/* - Components - */
import { DeleteFolderComponent } from '../../../components/Dashboard/Modal/Folder/DeleteFolder.component'
import { EditFolderComponent } from '../../../components/Dashboard/Modal/Folder/EditFolder.component'
import { DynamicIconComponent } from '../../../components/Dashboard/DynamicIcon.component'
import { CardListComponent } from '../../../components/Dashboard/Card/List/CardList.component'

/* - Types - */
type IconDivType = {
  size: number
}

type StatsNameStyledType = {
  iconColor: string
}

/* | - Inf Page - | */
/* InfPage */
export const InfPage: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()
  const { idD, idF } = useParams()
  const { profile, getDateString, getDirectoryId, getFolderId } = useProfile()

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
            {profile.directories[getDirectoryId(idD)].name}
          </Link>
          <Link underline="none" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
            <FolderOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Carpeta'}
          </Link>
          <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <NumbersOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].name}
          </Typography>
        </Breadcrumbs>
        <InfTopButtonsStyled>
          {/* edit */}
          <Tooltip title="Editar carpeta" TransitionComponent={Zoom} placement="bottom">
            <IconButton onClick={handleClickOpenEdit} sx={sxIconButton}>
              <IconDiv size={CSS.nav.button.size}>
                <DriveFileRenameOutlineIcon />
              </IconDiv>
            </IconButton>
          </Tooltip>
          <EditFolderComponent open={openEdit} handleClose={handleClose} />

          {/* delete */}
          <Tooltip title="Eliminar carpeta" TransitionComponent={Zoom} placement="bottom">
            <IconButton onClick={handleClickOpenDelete} sx={sxIconButton}>
              <IconDiv size={CSS.nav.button.size}>
                <DeleteOutlineOutlinedIcon />
              </IconDiv>
            </IconButton>
          </Tooltip>
          <DeleteFolderComponent open={openDelete} handleClose={handleClose} />
        </InfTopButtonsStyled>
      </InfTopStyled>

      <Card variant="outlined">
        <CardContent>
          <StatsDateStyled>
            <Typography sx={{ mb: 0.5, fontSize: '10px' }} color="rgba(255, 255, 255, 0.3)">
              {'Creado el: ' +
                getDateString(
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)]
                    .createdDate
                )}
            </Typography>
            <Typography sx={{ mb: 0.5, fontSize: '10px' }} color="rgba(255, 255, 255, 0.3)">
              {'Última actualización: ' +
                getDateString(
                  profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].updatedAt
                )}
            </Typography>
          </StatsDateStyled>

          <StatsNameStyled
            iconColor={
              profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].iconColor
            }
          >
            <DynamicIconComponent
              icon={profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].icon}
            />
            <Typography
              variant="h5"
              sx={{ mb: 0.3, marginTop: '4px', opacity: 0.8 }}
              color={
                profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].fontColor
              }
            >
              {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].name}
            </Typography>
          </StatsNameStyled>

          {profile.directories[getDirectoryId(idD)].description && (
            <Typography sx={{ mb: 2, fontSize: '12px' }} color="rgba(255, 255, 255, 0.5)">
              {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].description}
            </Typography>
          )}
          {profile.directories[getDirectoryId(idD)].information && (
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].information}
            </Typography>
          )}
        </CardContent>
      </Card>

      <ListDivStyled>
        <CardListComponent />
      </ListDivStyled>
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

const StatsNameStyled = styled.div<StatsNameStyledType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  svg {
    fill: ${(p): string => p.iconColor};
    opacity: 0.8;
  }
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

/* ListDivStyled */
const ListDivStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 1rem;
`
