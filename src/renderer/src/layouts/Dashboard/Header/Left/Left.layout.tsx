/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - Components - */
import { LeftButtonsComponent } from '../../../../components/Dashboard/Header/Left/LeftButtons.component'

/* | - Left Layout - | */
/* LeftLayout */
export const LeftLayout: React.FC = (): JSX.Element => {
  return <LeftStyled>{<LeftButtonsComponent />}</LeftStyled>
}

/* LeftStyled */
const LeftStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`
