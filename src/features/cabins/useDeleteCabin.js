import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useDeleteCabin() {
  const { isAdmin } = useUser();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (cabinId) => {
      if (!isAdmin) {
        throw new Error("Test users cannot delete cabins");
      }
      return deleteCabinApi(cabinId);
    },
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
