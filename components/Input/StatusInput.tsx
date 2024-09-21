import React from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { SingleInputType } from "./TitleInput";
import { Controller } from "react-hook-form";
import SelectDropdown from "react-native-select-dropdown";

const StatusInput = ({ control, errors }: SingleInputType) => {
  const statusOptions = ["Pending", "Confirmed", "Cancelled"];

  return (
    <>
      <View style={tw`flex w-full justify-between flex-row items-center mt-3`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <Text style={tw`text-blue-500 mr-2 text-base`}>Status</Text>
          {errors.status && (
            <Text style={tw`text-red-500`}>{errors.status.message}</Text>
          )}
        </View>

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <SelectDropdown
              data={statusOptions}
              onSelect={(selectedItem, index) => onChange(selectedItem)}
              defaultValue={value}
              dropdownStyle={tw`rounded-md`}
              renderButton={(selectedItem, placeholder) => (
                <View
                  style={tw`p-2 bg-white border border-gray-300 rounded-md w-24 flex flex-row items-center justify-center
                    ${value === "Cancelled" ? "bg-red-500" : ""} 
                    ${value === "Confirmed" ? "bg-green-500" : ""}
                    ${value === "Pending" ? "bg-yellow-500" : ""}
                    `}
                >
                  <Text style={tw`text-white`}>
                    {selectedItem || placeholder}
                  </Text>
                </View>
              )}
              renderItem={(item, index) => (
                <View style={tw`p-2`}>
                  <Text>{item}</Text>
                </View>
              )}
            />
          )}
        />
      </View>
    </>
  );
};

export default StatusInput;
