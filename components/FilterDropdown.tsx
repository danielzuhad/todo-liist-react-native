import { useAgenda } from "@/context/AgendaContext";
import React from "react";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import tw from "tailwind-react-native-classnames";

interface FilterDropdownProps {}

const FilterDropdown = ({}: FilterDropdownProps) => {
  const filterOptions = ["All", "Pending", "Confirmed", "Cancelled", "By Date"];

  const { setFiler, filter } = useAgenda();

  const getItemBackgroundColor = (selectedItem: string) => {
    switch (selectedItem) {
      case "Cancelled":
        return "bg-red-500";
      case "Confirmed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-white"; // Jika tidak ada status, default ke white
    }
  };

  return (
    <>
      <View style={tw` mx-4 flex items-end`}>
        <SelectDropdown
          data={filterOptions}
          onSelect={(selectedItem, index) => setFiler(selectedItem)}
          defaultValue={filter}
          dropdownStyle={tw`rounded-md`}
          renderButton={(selectedItem, placeholder) => (
            <View
              style={tw`p-2 bg-white border border-gray-300 rounded-md w-24 flex flex-row items-center shadow-sm justify-center ${getItemBackgroundColor(
                selectedItem
              )} `}
            >
              <Text style={tw`text-black`}>{selectedItem || "Filter"}</Text>
            </View>
          )}
          renderItem={(item, index) => (
            <View style={tw`p-2`}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default FilterDropdown;
