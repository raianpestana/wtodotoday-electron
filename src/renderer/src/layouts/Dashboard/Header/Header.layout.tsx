/* | - Imports - | */
/* - @emotion/styled - */
import styled from "@emotion/styled";

/* - Hooks - */
import { useGlobalStyle } from "../../../hooks/useGlobalStyle.hook";

/* - Layout - */
import { LeftLayout } from "./Left/Left.layout";
import { CenterLayout } from "./Center/Center.layout";
import { RightLayout } from "./Right/Right.layout";

/* - Types - */
/* HeaderStyledType */
type HeaderStyledType = {
  borderColor: string;
};

/* | - Header Layout - | */
/* HeaderLayout */
export const HeaderLayout: React.FC = (): JSX.Element => {
  /* - Hooks - */
  const { CSS } = useGlobalStyle();

  /* - Return - */
  return (
    <HeaderStyled borderColor={CSS.border.color}>
      <LeftLayout />
      <CenterLayout />
      <RightLayout />
    </HeaderStyled>
  );
};

/* | - Styled - | */
/* HeaderStyled */
const HeaderStyled = styled.header<HeaderStyledType>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 8px;
  padding: 1rem;
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid;
  border-bottom-color: ${(p): string => p.borderColor};
`;
