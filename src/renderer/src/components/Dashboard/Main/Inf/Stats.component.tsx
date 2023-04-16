/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - @mui/material - */
import Typography from '@mui/material/Typography'

/* | - Types - | */
type StatsComponentType = {
  span: string
  num: number
  icon: JSX.Element
}

/* | - Stats Component - | */
/* StatsComponent */
export const StatsComponent: React.FC<StatsComponentType> = (prop): JSX.Element => {
  return (
    <StatsCardDivStyled>
      <StatsCardSpanStyled>
        <Typography variant="body1" color="rgba(255, 255, 255, 0.7)">
          {prop.span}
        </Typography>
      </StatsCardSpanStyled>
      <StatsCardNumberStyled>
        <Typography variant="h4" color="rgba(255, 255, 255, 0.7)">
          {prop.num}
        </Typography>
        {prop.icon}
      </StatsCardNumberStyled>
    </StatsCardDivStyled>
  )
}

/* StatsCardDivStyled */
const StatsCardDivStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
`

const StatsCardSpanStyled = styled.div`
  display: flex;
  flex-direction: column;
`

const StatsCardNumberStyled = styled.div`
  display: flex;
  flex-direction: row;
`
