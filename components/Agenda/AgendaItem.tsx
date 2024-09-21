import { TaskDetailType } from "@/constants/DataDummy";
import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Ban, CircleCheck, Hourglass, Trash } from "lucide-react-native";
import { iconStyle } from "@/constants/IconStyel";
import tw from "tailwind-react-native-classnames";
import { SwipeRow } from "react-native-swipe-list-view";
import { deleteTodo } from "@/utils/storage";
import { useAgenda } from "@/context/AgendaContext";

interface AgendaItemProps {
  item: TaskDetailType;
}

const AgendaItem: React.FC<AgendaItemProps> = React.memo(({ item }) => {
  const { showNotification, selectedDate, refetch, handleItemPress } =
    useAgenda();

  const swipeRowRef = useRef<any>(null);

  const conditionalStatus = () => {
    switch (item.status) {
      case "Confirmed":
        return <CircleCheck {...iconStyle} color="green" />;
      case "Pending":
        return <Hourglass {...iconStyle} color="orange" />;
      case "Cancelled":
        return <Ban {...iconStyle} color="red" />;
      default:
        return <Text>Unknown Status</Text>;
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          swipeRowRef.current?.closeRow();
          await deleteTodo(selectedDate, item.name);
          showNotification("Todo Deleted", `"${item.name}" has been deleted.`);
          refetch();
        },
      },
    ]);
  };

  useEffect(() => {
    swipeRowRef.current?.closeRow();
  }, [selectedDate]);

  return (
    <View style={tw`w-full mx-2 bg-white border-b border-gray-300`}>
      {/* @ts-ignore */}
      <SwipeRow ref={swipeRowRef} leftOpenValue={75} disableLeftSwipe>
        <View
          style={tw`flex flex-row justify-start items-center bg-red-500   mx-2  h-full w-full`}
        >
          <Pressable
            onPress={handleDelete}
            style={tw`items-start justify-center h-full flex  w-full pl-4`}
          >
            <Text style={tw`text-white font-bold`}>
              <Trash {...iconStyle} color={"white"} />
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            handleItemPress(item);
          }}
          style={tw`flex flex-row items-center justify-between px-3 py-5  bg-white `}
        >
          <View>
            <View style={tw`w-full`}>
              <Text style={tw`w-full text-xl font-medium text-black `}>
                {item.name}
              </Text>
              <Text style={tw`mt-1 text-sm text-gray-500`}>{item.time}</Text>
            </View>
          </View>

          <View style={tw`flex items-end justify-center`}>
            {conditionalStatus()}
          </View>
        </Pressable>
      </SwipeRow>
    </View>
  );
});

export default React.memo(AgendaItem);
