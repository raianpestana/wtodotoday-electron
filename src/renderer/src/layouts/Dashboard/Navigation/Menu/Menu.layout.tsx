/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* | - Menu Layout - | */
/* MenuLayout */
export const MenuLayout = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  row-gap: 4px;
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
