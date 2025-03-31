import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useCheckout() {
  const { isAdmin } = useUser();
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      error && !isAdmin
        ? toast.error("Test users cannot check-out guests")
        : toast.error(error.message);
    },
  });

  return { checkout, isCheckingOut };
}
