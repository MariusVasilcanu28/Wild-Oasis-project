import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { useUser } from "../authentication/useUser";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isAdmin } = useUser();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: (data) => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      error && !isAdmin
        ? toast.error("Test users cannot update hotel settings")
        : toast.error(error.message);
    },
  });

  return { isUpdating, updateSetting };
}
