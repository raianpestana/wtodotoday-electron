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
import { IconDirectoryComponent } from '../../../../components/Dashboard/Navigation/Directory/IconDirectory.component'
import { MenuDirectoryComponent } from '../../../../components/Dashboard/Navigation/Directory/MenuDirectory.component'
import { ButtonAddDirectoryComponent } from '../../../../components/Dashboard/Navigation/Directory/ButtonAddDirectory.component'

/* - Types - */
/* DirectoryStyledType */
type DirectoryStyledType = {
  width: string
  borderColor: string
  isOnlyIcons: boolean
}

/* | - Directory Layout - | */
/* DirectoryLayout */
export const DirectoryLayout: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle()

  /* - Return - */
  return (
    <DirectoryStyled
      width={CSS.nav.directory.width}
      borderColor={CSS.border.color}
      isOnlyIcons={CSS.nav.isOnlyIcons}
    >
      <TopLayout>
        <IconDirectoryComponent />
      </TopLayout>
      <MenuLayout>
        <MenuDirectoryComponent />
      </MenuLayout>
      <BottomLayout>
        <ButtonAddDirectoryComponent />
      </BottomLayout>
    </DirectoryStyled>
  )
}

/* | - Styled - | */
/* DirectoryStyled */
const DirectoryStyled = styled.div<DirectoryStyledType>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: ${(p): string => (p.isOnlyIcons ? 'fit-content' : p.width)};
  height: 100%;
  border-right: 1px solid;
  border-right-color: ${(p): string => p.borderColor};
`
