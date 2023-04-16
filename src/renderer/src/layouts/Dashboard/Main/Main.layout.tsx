/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - React - */
import { Outlet } from 'react-router-dom'

/* - Layouts - */
import { HeaderLayout } from '../Header/Header.layout'

/* | - Main Layout - | */
/* MainLayout */
export const MainLayout: React.FC = (): JSX.Element => {
  /* - Return - */
  return (
    <MainStyled>
      <HeaderLayout />
      <ContentDiv>
        <Outlet />
      </ContentDiv>
    </MainStyled>
  )
}

/* | - Styled - | */
/* MainStyled */
const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

/* ContentDiv */
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem;

  overflow-y: auto;
  overflow-x: hidden;
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.1);
    border-radius: 16px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`
