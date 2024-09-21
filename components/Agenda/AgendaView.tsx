import useAgenda from "@/hooks/useAgenda";
import React, { useCallback } from "react";
import { AgendaList, Calendar, CalendarProvider } from "react-native-calendars";
import EmptyAgenda from "./EmptyAgenda";
import AgendaItem from "./AgendaItem";
import tw from "tailwind-react-native-classnames";
import useModal from "@/hooks/useModal";
import ModalTodo from "../ModalTodo";
import ButtonIcon from "../ButtonIcon";
import { Text } from "react-native";

const AgendaView = () => {
  const {
    markedDates,
    selectedDate,
    onDayPress,
    isError,
    isLoading,
    refetch,
    filteredItems,
    showNotification,
  } = useAgenda();

  const {
    setModalVisible,
    modalVisible,
    handleAddTodo,
    handleItemPress,
    selectedTask,
  } = useModal();

  const renderItem = useCallback(({ item }: any) => {
    return (
      <AgendaItem
        showNotification={showNotification}
        selectedDate={selectedDate}
        refetch={refetch}
        onPress={() => handleItemPress(item)}
        item={item}
      />
    );
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
          style={{
            marginBottom: 20,
          }}
          markedDates={markedDates}
          onDayPress={onDayPress}
        />

        {/* conditional list */}
        {filteredItems.length === 0 ? (
          <EmptyAgenda />
        ) : (
          <AgendaList sections={filteredItems} renderItem={renderItem} />
        )}

        {/* modal  */}
        <ModalTodo
          refetch={refetch}
          selectedDate={selectedDate}
          setModalVisible={setModalVisible}
          visible={modalVisible}
          editItem={selectedTask}
        />

        {/* button toggle modal */}
        <ButtonIcon size={16} setModalVisible={handleAddTodo} />
      </CalendarProvider>
    </>
  );
};

export default AgendaView;
