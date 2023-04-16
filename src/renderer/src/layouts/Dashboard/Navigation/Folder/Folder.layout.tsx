/* | - Imports - | */
/* - @emotion/styled - */
import styled from '@emotion/styled'

/* - Hooks - */
import { useGlobalStyle } from '../../../../hooks/useGlobalStyle.hook'
import { BottomLayout } from '../Bottom/Bottom.layout'

/* - Layout - */
import { MenuLayout } from '../Menu/Menu.layout'
import { TopLayout } from '../Top/Top.layout'

/* - Components - */
import { IconFolderComponent } from '../../../../components/Dashboard/Navigation/Folder/IconFolder.component'
import { MenuFolderComponent } from '../../../../components/Dashboard/Navigation/Folder/MenuFolder.component'
import { ButtonAddFolderComponent } from '../../../../components/Dashboard/Navigation/Folder/ButtonAddFolder.component'

/* - Types - */
/* FolderStyledType */
type FolderStyledType = {
  width: string
  borderColor: string
  isOnlyIcons: boolean
}

/* | - Folder Layout - | */
/* FolderLayout */
export const FolderLayout: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()

  /* - Return - */
  return (
    <FolderStyled
      width={CSS.nav.folder.width}
      borderColor={CSS.border.color}
      isOnlyIcons={CSS.nav.isOnlyIcons}
    >
      <TopLayout>
        <IconFolderComponent />
      </TopLayout>
      <MenuLayout>
        <MenuFolderComponent />
      </MenuLayout>
      <BottomLayout>
        <ButtonAddFolderComponent />
      </BottomLayout>
    </FolderStyled>
  )
}

/* | - Styled - | */
/* FolderStyled */
const FolderStyled = styled.div<FolderStyledType>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: ${(p): string => (p.isOnlyIcons ? 'fit-content' : p.width)};
  height: 100%;
  border-right: 1px solid;
  border-right-color: ${(p): string => p.borderColor};
`
