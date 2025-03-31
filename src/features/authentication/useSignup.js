import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useUser } from "../authentication/useUser";
export function useSignup() {
  const { isAdmin } = useUser();

  const mutationFn = async (data) => {
    if (!isAdmin) {
      throw new Error("Test users cannot create new users");
    }
    return signupApi(data);
  };

  const { mutate: signup, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: (error) => toast.error(error.message),
  });

  return { signup, isPending };
}
