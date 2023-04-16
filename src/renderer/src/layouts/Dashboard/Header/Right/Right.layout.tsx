/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - Component - */
import { CenterAvatarComponent } from '../../../../components/Dashboard/Header/Right/Avatar.component'

/* | - Right Layout - | */
/* RightLayout */
export const RightLayout: React.FC = (): JSX.Element => {
  return (
    <RightStyled>
      <CenterAvatarComponent />
    </RightStyled>
  )
}

/* RightStyled */
const RightStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`
