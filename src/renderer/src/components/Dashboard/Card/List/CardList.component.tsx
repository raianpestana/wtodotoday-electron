/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
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
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

/* - Hooks - */
import { useProfile } from '../../../../hooks/useProfile.hook'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

/* - Components - */
import { DynamicIconComponent } from '../../../../components/Dashboard/DynamicIcon.component'
import { AddListComponent } from '../../../../components/Dashboard/Modal/List/AddList.component'
import { DeleteListComponent } from '../../../../components/Dashboard/Modal/List/DeleteList.component'
import { EditListComponent } from '../../../../components/Dashboard/Modal/List/EditList.component'

/* - Types - */
type IconDivType = {
  size: number
}

type CardTitleStyledType = {
  iconColor: string
}

/* | - CardList Component - | */
/* CardListComponent */
export const CardListComponent: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { idD, idF } = useParams()
  const [idL, setIdL] = useState<number>(0)
  const [stateList, setStateList] = useState<string>('Pendiente')
  const { profile, getDirectoryId, getFolderId } = useProfile()

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
    setOpenListCreate(false)
    setOpenListDelete(false)
    setOpenListEdit(false)
  }

  const listCardList = ['Pendiente', 'En proceso', 'Completado']

  return (
    <>
      {listCardList.map((typeList, key) => (
        <ListContentStyled key={key}>
          <ListTitleStyled>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              {typeList}
            </Typography>
            <Tooltip title="Crear lista" TransitionComponent={Zoom} placement="bottom">
              <IconButton
                onClick={(e): void => handleClickOpenListCreate(e, typeList)}
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
                data.state === typeList && (
                  <Card
                    key={`list${data.id}`}
                    variant={data.elevation === 0 ? 'outlined' : 'elevation'}
                    elevation={data.elevation}
                    sx={{ boxShadow: 0 }}
                  >
                    <CardContent>
                      <CardHeaderStyled>
                        <CardTitleStyled iconColor={data.iconColor}>
                          <DynamicIconComponent icon={data.icon} />
                          <Typography variant="h6" color={data.fontColor}>
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
      ))}

      <AddListComponent open={openListCreate} handleClose={handleClose} state={stateList} />
      <DeleteListComponent open={openListDelete} handleClose={handleClose} idL={idL} />
      <EditListComponent open={openListEdit} handleClose={handleClose} idL={idL} />
    </>
  )
}

/* | - Styled - | */
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

const CardTitleStyled = styled.div<CardTitleStyledType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  svg {
    fill: ${(p): string => p.iconColor};
  }
`
