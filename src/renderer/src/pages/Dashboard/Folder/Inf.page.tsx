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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

/* - @mui/icons-material - */
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

/* - Hooks - */
import { useProfile } from '../../../hooks/useProfile.hook'
import { useParams } from 'react-router-dom'
import { useGlobalStyle } from '../../../hooks/useGlobalStyle.hook'
import { useState } from 'react'

/* - Components - */
import { DeleteFolderComponent } from '../../../components/Dashboard/Modal/Folder/DeleteFolder.component'
import { EditFolderComponent } from '../../../components/Dashboard/Modal/Folder/EditFolder.component'
import { DynamicIconComponent } from '../../../components/Dashboard/DynamicIcon.component'
import { AddListComponent } from '../../../components/Dashboard/Modal/List/AddList.component'
import { DeleteListComponent } from '../../../components/Dashboard/Modal/List/DeleteList.component'
import { EditListComponent } from '../../../components/Dashboard/Modal/List/EditList.component'

/* - Types - */
type IconDivType = {
  size: number
}

/* | - Inf Page - | */
/* InfPage */
export const InfPage: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()
  const { idD, idF } = useParams()
  const [idL, setIdL] = useState<number>(0)
  const [stateList, setStateList] = useState<string>('Pendiente')
  const { profile, getDateString, getDirectoryId, getFolderId } = useProfile()

  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [openListCreate, setOpenListCreate] = useState(false)
  const [openListDelete, setOpenListDelete] = useState(false)
  const [openListEdit, setOpenListEdit] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = (): void => {
    setAnchorEl(null)
  }

  /* - Handle - */
  /* handleClickOpenDelete */
  const handleClickOpenDelete = (): void => {
    setOpenDelete(true)
  }

  /* handleClickOpenEdit */
  const handleClickOpenEdit = (): void => {
    setOpenEdit(true)
  }

  /* handleClickOpenListCreate */
  const handleClickOpenListCreate = (
    _e: React.MouseEvent<HTMLButtonElement>,
    setState: string
  ): void => {
    setStateList(setState)
    setOpenListCreate(true)
  }

  /* handleClickOpenListDelete */
  const handleClickOpenListDelete = (): void => {
    handleCloseMenu()
    setOpenListDelete(true)
  }

  /* handleClickOpenListEdit */
  const handleClickOpenListEdit = (): void => {
    handleCloseMenu()
    setOpenListEdit(true)
  }

  /* handleClose */
  const handleClose = (): void => {
    setOpenDelete(false)
    setOpenEdit(false)
    setOpenListCreate(false)
    setOpenListDelete(false)
    setOpenListEdit(false)
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
          <Link underline="none" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
            <FolderOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Carpeta'}
          </Link>
          <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <NumbersOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {idF}
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

          <StatsNameStyled>
            <DynamicIconComponent
              icon={profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].icon}
            />
            <Typography
              variant="h5"
              sx={{ mb: 0.3, marginTop: '4px' }}
              color="rgba(255, 255, 255, 0.7)"
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

      <AddListComponent open={openListCreate} handleClose={handleClose} state={stateList} />
      <DeleteListComponent open={openListDelete} handleClose={handleClose} idL={idL} />
      <EditListComponent open={openListEdit} handleClose={handleClose} idL={idL} />

      <ListDivStyled>
        {/* Pendiente */}
        <ListContentStyled>
          <ListTitleStyled>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              {'Pendiente'}
            </Typography>
            <Tooltip title="Crear lista" TransitionComponent={Zoom} placement="bottom">
              <IconButton
                onClick={(e): void => handleClickOpenListCreate(e, 'Pendiente')}
                sx={sxIconButton}
              >
                <IconDiv size={16}>
                  <PlaylistAddOutlinedIcon />
                </IconDiv>
              </IconButton>
            </Tooltip>
          </ListTitleStyled>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleClickOpenListEdit}>Editar</MenuItem>
            <MenuItem onClick={handleClickOpenListDelete}>Eliminar</MenuItem>
          </Menu>

          {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists.length >
            0 &&
            profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists.map(
              (data) =>
                data.state === 'Pendiente' && (
                  <Card key={`list${data.id}`} variant="outlined" elevation={0}>
                    <CardContent>
                      <CardHeaderStyled>
                        <CardTitleStyled>
                          <DynamicIconComponent icon={data.icon} />
                          <Typography variant="h6" color="warning">
                            {data.name}
                          </Typography>
                        </CardTitleStyled>
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClickCapture={(): void => {
                            setIdL(data.id)
                          }}
                          onClick={handleClickMenu}
                          sx={sxCardIconButton}
                        >
                          <IconDiv size={20}>
                            <MoreVertOutlinedIcon />
                          </IconDiv>
                        </IconButton>
                      </CardHeaderStyled>

                      {data.description && (
                        <Typography
                          variant="body1"
                          sx={{ mb: 1, marginLeft: '4px', fontSize: '12px' }}
                          color="rgba(255, 255, 255, 0.5)"
                        >
                          {data.description}
                        </Typography>
                      )}
                      {data.information && (
                        <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
                          {data.information}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                )
            )}
        </ListContentStyled>

        {/* En proceso */}
        <ListContentStyled>
          <ListTitleStyled>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              {'En proceso'}
            </Typography>
            <Tooltip title="Crear lista" TransitionComponent={Zoom} placement="bottom">
              <IconButton
                onClick={(e): void => handleClickOpenListCreate(e, 'En proceso')}
                sx={sxIconButton}
              >
                <IconDiv size={16}>
                  <PlaylistAddOutlinedIcon />
                </IconDiv>
              </IconButton>
            </Tooltip>
          </ListTitleStyled>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleClickOpenListEdit}>Editar</MenuItem>
            <MenuItem onClick={handleClickOpenListDelete}>Eliminar</MenuItem>
          </Menu>

          {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists.length >
            0 &&
            profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists.map(
              (data) =>
                data.state === 'En proceso' && (
                  <Card key={`list${data.id}`} variant="outlined" elevation={0}>
                    <CardContent>
                      <CardHeaderStyled>
                        <CardTitleStyled>
                          <DynamicIconComponent icon={data.icon} />
                          <Typography variant="h6" color="warning">
                            {data.name}
                          </Typography>
                        </CardTitleStyled>
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClickCapture={(): void => {
                            setIdL(data.id)
                          }}
                          onClick={handleClickMenu}
                          sx={sxCardIconButton}
                        >
                          <IconDiv size={20}>
                            <MoreVertOutlinedIcon />
                          </IconDiv>
                        </IconButton>
                      </CardHeaderStyled>

                      {data.description && (
                        <Typography
                          variant="body1"
                          sx={{ mb: 1, marginLeft: '4px', fontSize: '12px' }}
                          color="rgba(255, 255, 255, 0.5)"
                        >
                          {data.description}
                        </Typography>
                      )}
                      {data.information && (
                        <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
                          {data.information}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                )
            )}
        </ListContentStyled>

        {/* Completado */}
        <ListContentStyled>
          <ListTitleStyled>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              {'Completado'}
            </Typography>
            <Tooltip title="Crear lista" TransitionComponent={Zoom} placement="bottom">
              <IconButton
                onClick={(e): void => handleClickOpenListCreate(e, 'Completado')}
                sx={sxIconButton}
              >
                <IconDiv size={16}>
                  <PlaylistAddOutlinedIcon />
                </IconDiv>
              </IconButton>
            </Tooltip>
          </ListTitleStyled>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleClickOpenListEdit}>Editar</MenuItem>
            <MenuItem onClick={handleClickOpenListDelete}>Eliminar</MenuItem>
          </Menu>

          {profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists.length >
            0 &&
            profile.directories[getDirectoryId(idD)].folders[getFolderId(idD, idF)].lists.map(
              (data) =>
                data.state === 'Completado' && (
                  <Card key={`list${data.id}`} variant="outlined" elevation={0}>
                    <CardContent>
                      <CardHeaderStyled>
                        <CardTitleStyled>
                          <DynamicIconComponent icon={data.icon} />
                          <Typography variant="h6" color="warning">
                            {data.name}
                          </Typography>
                        </CardTitleStyled>
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClickCapture={(): void => {
                            setIdL(data.id)
                          }}
                          onClick={handleClickMenu}
                          sx={sxCardIconButton}
                        >
                          <IconDiv size={20}>
                            <MoreVertOutlinedIcon />
                          </IconDiv>
                        </IconButton>
                      </CardHeaderStyled>

                      {data.description && (
                        <Typography
                          variant="body1"
                          sx={{ mb: 1, marginLeft: '4px', fontSize: '12px' }}
                          color="rgba(255, 255, 255, 0.5)"
                        >
                          {data.description}
                        </Typography>
                      )}
                      {data.information && (
                        <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
                          {data.information}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                )
            )}
        </ListContentStyled>
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

const sxCardIconButton: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2px',
  paddingRight: '3px',
  paddingButtonAddDirectory: '11px',
  width: 'fit-content',
  height: 'fit-content',

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

/* ListContentStyled */
const ListContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  width: 17rem;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`

const ListTitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
`

const CardHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  color: rgba(255, 255, 255, 0.5);
`

const CardTitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
`
