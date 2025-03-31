import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";
export function useCreateCabin() {
  const { isAdmin } = useUser();
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      error && !isAdmin
        ? toast.error("Test users cannot insert new cabins")
        : toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
}
