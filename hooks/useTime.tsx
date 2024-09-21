import { useState } from "react";

/**
 * Hook to manage the visibility of a date picker.
 *
 * @returns
 *   - `isDatePickerVisible`: Whether the date picker is visible or not.
 *   - `showDatePicker`: Function to show the date picker.
 *   - `hideDatePicker`: Function to hide the date picker.
 */

const useTime = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return {
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
  };
};

export default useTime;
