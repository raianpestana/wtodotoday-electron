/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
// import Paper from '@mui/material/Paper'

/* - @mui/icons-material - */
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'

/* - Component - */
import { StatsComponent } from '../../../components/Dashboard/Main/Inf/Stats.component'

/* - Hooks - */
import { useProfile } from '../../../hooks/useProfile.hook'

/* - React - */
import { NavLink } from 'react-router-dom'

/* | - Inf Page - | */
/* InfPage */
export const InfPage: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { stats } = useProfile()

  /* - Return - */
  return (
    <InfStyled>
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
          {'Información'}
        </Typography>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {'Información'}
          </Typography>
        </CardContent>
      </Card>
      <StatsStyled>
        <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
          {'Estadísticas en total'}
        </Typography>
        <StatsDivStyled>
          <StatsComponent
            span="Directorios"
            num={stats.directories}
            icon={<LinkOutlinedIcon sx={{ fill: 'rgba(255, 255, 255, 0.7)' }} />}
          />
          <StatsComponent
            span="Carpetas"
            num={stats.folders}
            icon={<FolderOutlinedIcon sx={{ fill: 'rgba(255, 255, 255, 0.7)' }} />}
          />
          <StatsComponent
            span="Listas"
            num={stats.lists}
            icon={<AssignmentOutlinedIcon sx={{ fill: 'rgba(255, 255, 255, 0.7)' }} />}
          />
        </StatsDivStyled>
        <Alert severity="info">
          {
            'La estadística mostrada va en función a todos los directorios, carpetas y listas creadas.'
          }
        </Alert>
      </StatsStyled>
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

/* StatsStyled */
const StatsStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

/* StatsDivStyled */
const StatsDivStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;
`
