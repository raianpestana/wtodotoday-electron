/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Zoom from '@mui/material/Zoom'

/* - @mui/icons-material - */
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { DeleteAccountComponent } from '../../../components/Dashboard/Modal/Account/DeleteAccount.component'
import { EditAccountComponent } from '../../../components/Dashboard/Modal/Account/EditAccount.component'

/* - Hooks - */
import { useProfile } from '../../../hooks/useProfile.hook'
import { useGlobalStyle } from '../../../hooks/useGlobalStyle.hook'

/* - React - */
import { NavLink } from 'react-router-dom'
import { SxProps } from '@mui/material'
import { useState } from 'react'

/* - Types - */
type IconDivType = {
  size: number
}

/* | - Account Page - | */
/* AccountPage */
export const AccountPage: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()
  const { profile, getDateString } = useProfile()
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
          <Link
            component={NavLink}
            to="/dashboard"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
          >
            <DashboardOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Dashboard'}
          </Link>
          <Link
            component={NavLink}
            to="/dashboard/main"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
          >
            <HomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Principal'}
          </Link>
          <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <InfoOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {'Cuenta'}
          </Typography>
        </Breadcrumbs>
        <InfTopButtonsStyled>
          {/* edit */}
          <Tooltip title="Editar cuenta" TransitionComponent={Zoom} placement="bottom">
            <IconButton sx={sxIconButton} onClick={handleClickOpenEdit}>
              <IconDiv size={CSS.nav.button.size}>
                <DriveFileRenameOutlineIcon />
              </IconDiv>
            </IconButton>
          </Tooltip>
          <EditAccountComponent open={openEdit} handleClose={handleClose} />

          {/* delete */}
          <Tooltip title="Eliminar directorio" TransitionComponent={Zoom} placement="bottom">
            <IconButton onClick={handleClickOpenDelete} sx={sxIconButton}>
              <IconDiv size={CSS.nav.button.size}>
                <DeleteOutlineOutlinedIcon />
              </IconDiv>
            </IconButton>
          </Tooltip>
          <DeleteAccountComponent open={openDelete} handleClose={handleClose} />
        </InfTopButtonsStyled>
      </InfTopStyled>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {'Cuenta'}
          </Typography>
        </CardContent>
      </Card>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{'Nombre'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{profile.fullname}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{'Nombre de usuario'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{profile.username}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>{'Email'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{profile.email}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>{'Fechas'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{'Creado el día:' + getDateString(profile.createdDate)}</Typography>
            <Typography>{'Última actualización' + getDateString(profile.updatedAt)}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
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
