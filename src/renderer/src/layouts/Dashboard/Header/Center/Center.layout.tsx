/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - Component - */
import { CenterLogoComponent } from '../../../../components/Dashboard/Header/Center/Logo.component'

/* | - Center Layout - | */
/* CenterLayout */
export const CenterLayout: React.FC = (): JSX.Element => {
  return (
    <CenterStyled>
      <CenterLogoComponent />
    </CenterStyled>
  )
}

/* CenterStyled */
const CenterStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`
