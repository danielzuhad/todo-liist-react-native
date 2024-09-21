import React, { useCallback } from "react";
import { AgendaList, Calendar, CalendarProvider } from "react-native-calendars";
import EmptyAgenda from "./EmptyAgenda";
import AgendaItem from "./AgendaItem";
import tw from "tailwind-react-native-classnames";
import ModalTodo from "../ModalTodo";
import ButtonIcon from "../ButtonIcon";
import { Text } from "react-native";
import { useAgenda } from "@/context/AgendaContext";
import { calendarTheme } from "@/constants/CalendarTheme";

const AgendaView = () => {
  const {
    isError,
    isLoading,
    filteredItems,
    markedDates,
    onDayPress,
    selectedDate,
    modalVisible,
    handleAddTodo,
  } = useAgenda();

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading todos.</Text>;
  }

  return (
    <>
      <CalendarProvider date={selectedDate} style={tw`flex-1 relative`}>
        <Calendar
          style={tw`mb-5`}
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={calendarTheme}
        />

        {/* conditional list */}
        {filteredItems.length === 0 ? (
          <EmptyAgenda />
        ) : (
          <AgendaList sections={filteredItems} renderItem={renderItem} />
        )}

        {/* modal  */}
        <ModalTodo />

        {/* button toggle modal */}
        <ButtonIcon size={16} setModalVisible={handleAddTodo} />
      </CalendarProvider>
    </>
  );
};

export default AgendaView;
