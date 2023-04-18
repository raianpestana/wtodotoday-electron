/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

/* - @mui/icons-material - */
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

/* - React - */
import { NavLink } from 'react-router-dom'

/* | - Update Page - | */
/* UpdatePage */
export const UpdatePage: React.FC = (): JSX.Element => {
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
            {'Actualizar'}
          </Typography>
        </Breadcrumbs>
      </InfTopStyled>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {'Actualizar'}
          </Typography>
        </CardContent>
      </Card>
      <Alert severity="info">{'No hay actualizaciones disponibles.'}</Alert>
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
