/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

/* - @mui/icons-material - */
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

/* - React - */
import { NavLink } from 'react-router-dom'

type TableListType = { name: string; version: string }

const TableListDesign: TableListType[] = [{ name: 'wtodotoday', version: 'v1.0.0' }]

/* | - About Page - | */
/* AboutPage */
export const AboutPage: React.FC = (): JSX.Element => {
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
            {'Acerca de'}
          </Typography>
        </Breadcrumbs>
      </InfTopStyled>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {'Acerca de'}
          </Typography>
        </CardContent>
      </Card>
      <div>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Programa</TableCell>
                <TableCell>Versión</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TableListDesign.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
