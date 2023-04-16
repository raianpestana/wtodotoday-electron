/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - React - */
import { Outlet } from 'react-router-dom'

/* | - Auth Layout - | */
/* AuthLayout */
export const AuthLayout: React.FC = (): JSX.Element => {
  /* - Return - */
  return (
    <AuthStyled>
      <MainStyled>
        <DivStyled>
          <Outlet />
        </DivStyled>
      </MainStyled>
    </AuthStyled>
  )
}

/* | - Styled - | */
/* - AuthStyled - */
const AuthStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: rgb(23, 23, 23);

  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
`

/* MainStyled */
const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 1rem;
`

/* DivStyled */
const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 1rem;
  box-shadow: 0px -1px 48px -1px rgba(0, 0, 0, 0.2);
  animation: DivAnimation 0.5s;
  animation-iteration-count: 1;

  @keyframes DivAnimation {
    from {
      scale: 0;
    }

    to {
      scale: 1;
    }
  }
`
