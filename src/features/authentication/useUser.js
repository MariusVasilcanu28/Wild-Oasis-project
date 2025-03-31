import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAdmin = user?.id === import.meta.env.VITE_ADMIN_USER;
  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated",
    isAdmin,
  };
}
