import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export function useCheckin() {
  const { isAdmin } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (error) => {
      error && !isAdmin
        ? toast.error("Test users cannot check-in guests")
        : toast.error(error.message);
    },
  });

  return { checkin, isCheckingIn };
}
