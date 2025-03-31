import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // If no auth user, redirect to '/login'
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [navigate, isAuthenticated, isPending]);

  // While pending, show spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If auth user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
