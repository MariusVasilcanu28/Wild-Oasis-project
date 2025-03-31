import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { useUser } from "../features/authentication/useUser";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function SideBar() {
  const { isAdmin } = useUser();

  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
      {isAdmin && <Uploader />}
    </StyledSideBar>
  );
}

export default SideBar;
