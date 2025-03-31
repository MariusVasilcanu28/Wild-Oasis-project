import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { register } = useForm();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, oldValue, fieldName) {
    const { value } = e.target;

    if (!value) return;
    if (+value === oldValue) return;

    updateSetting({ [fieldName]: +value });
  }

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          min={0}
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            disabled: isUpdating,
            onBlur: (e) =>
              handleUpdate(e, minBookingLength, "minBookingLength"),
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          min={0}
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            disabled: isUpdating,
            onBlur: (e) =>
              handleUpdate(e, maxBookingLength, "maxBookingLength"),
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          min={0}
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking", {
            disabled: isUpdating,
            onBlur: (e) =>
              handleUpdate(e, maxGuestsPerBooking, "maxGuestsPerBooking"),
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          min={0}
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            disabled: isUpdating,
            onBlur: (e) => handleUpdate(e, breakfastPrice, "breakfastPrice"),
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
