/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - Layouts - */
import { DirectoryLayout } from './Directory/Directory.layout'
import { FolderLayout } from './Folder/Folder.layout'

/* | - Navigation Layout - | */
/* NavigationLayout */
export const NavigationLayout: React.FC = (): JSX.Element => {
  /* - Return - */
  return (
    <NavigationStyled>
      <DirectoryLayout />
      <FolderLayout />
    </NavigationStyled>
  )
}

/* | - Styled - | */
/* NavigationStyled */
const NavigationStyled = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100%;
`
