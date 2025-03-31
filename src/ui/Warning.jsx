import styled from "styled-components";

const StyledWarning = styled.div`
  background-color: var(--color-yellow-100);
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  gap: 1.2rem;
  color: var(--warning-color);
`;

function Warning({ children }) {
  return <StyledWarning>{children}</StyledWarning>;
}

export default Warning;
