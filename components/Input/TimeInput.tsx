import React from "react";
import { SingleInputType } from "./TitleInput";
import { Pressable, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const TimeInput = ({
  control,
  errors,
  showDatePicker,
  getValues,
}: SingleInputType & {
  showDatePicker: () => void;
  getValues: (name: string) => string;
}) => (
  <View style={tw`mt-3`}>
    <View style={tw`flex flex-row items-center justify-between`}>
      <Pressable onPress={showDatePicker}>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`text-blue-500 mr-2 text-base`}>Select Time</Text>
          {errors.time && (
            <Text style={tw`text-red-500`}>{errors.time.message}</Text>
          )}
        </View>
      </Pressable>
      <Text style={tw`text-black text-lg font-semibold`}>
        {getValues("time")}
      </Text>
    </View>
  </View>
);

export default React.memo(TimeInput);
