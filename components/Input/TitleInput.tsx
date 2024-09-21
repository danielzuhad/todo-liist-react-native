import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import tw from "tailwind-react-native-classnames";

export interface SingleInputType {
  control: Control<
    {
      title: string;
      time: string;
      status: string;
    },
    any
  >;
  errors: FieldErrors<{
    title: string;
    time: string;
    status: string;
  }>;
}

const TitleInput = ({ control, errors }: SingleInputType) => (
  <View>
    <View style={tw`flex flex-row items-center`}>
      <Text style={tw`text-blue-500 mr-2 text-base`}>Title</Text>
      {errors.title && (
        <Text style={tw`text-red-500`}>{errors.title.message}</Text>
      )}
    </View>

    <Controller
      control={control}
      name="title"
      render={({ field: { onChange, value } }) => (
        <TextInput
          style={tw`w-full border-b border-gray-500 px-2 rounded-sm text-lg font-semibold `}
          placeholder="make a task "
          onChangeText={onChange}
          value={value}
        />
      )}
    />
  </View>
);

export default React.memo(TitleInput);
