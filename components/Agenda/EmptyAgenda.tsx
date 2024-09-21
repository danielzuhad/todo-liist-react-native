import React, { memo } from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const EmptyAgenda = memo(() => {
  return (
    <View
      style={tw`py-5 px-3 mx-2  bg-white border-b border-gray-300 flex-row flex justify-between items-center`}
    >
      <Text>No Events Planned</Text>
    </View>
  );
});

export default EmptyAgenda;
