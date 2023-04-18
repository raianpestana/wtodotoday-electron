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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

/* - React - */
import { NavLink } from 'react-router-dom'

type TableListType = { name: string; url: string }

const TableListDesign: TableListType[] = [
  { name: '@mui/material', url: 'https://mui.com/material-ui/getting-started/overview/' },
  { name: '@mui/icons-material', url: 'https://mui.com/material-ui/material-icons/' }
]

const TableListProgramming: TableListType[] = [
  { name: 'JavaScript', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
  { name: 'electron-vite', url: 'https://evite.netlify.app/' },
  { name: 'ReactJS', url: 'https://react.dev/' }
]

const TableListSupport: TableListType[] = [
  { name: 'eisegroup', url: 'https://www.instagram.com/eisegroup' }
]

/* | - Thanks Page - | */
/* ThanksPage */
export const ThanksPage: React.FC = (): JSX.Element => {
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
            {'Gratitud'}
          </Typography>
        </Breadcrumbs>
      </InfTopStyled>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {'Gratitud (Agradeicimientos / Acreditación)'}
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
            <Typography>{'Diseño'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TableListDesign.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Link
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                        >
                          {row.url}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>{'Programación'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TableListProgramming.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Link
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                        >
                          {row.url}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>{'Apoyo'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TableListSupport.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Link
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                        >
                          {row.url}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
