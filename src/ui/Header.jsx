import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import Warning from "./Warning";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <Warning>
        <span>
          Data Mutation (INSERT, UPDATE, DELETE) is forbidden for test users.
          Ask the admin for access.
        </span>
      </Warning>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
