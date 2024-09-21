import React from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import ButtonIcon from "./ButtonIcon";
import { Controller } from "react-hook-form";
import { todoSchema } from "@/schema/todoSchema";
import useTime from "@/hooks/useTime";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { z } from "zod";
import ModalWrapper from "./ui/ModalWrapper";
import TitleInput from "./Input/TitleInput";
import TimeInput from "./Input/TimeInput";
import { addTodo, updateTodo } from "@/utils/storage";
import StatusInput from "./Input/StatusInput";
import { useAgenda } from "@/context/AgendaContext";

interface ModalTodoProps {}

const ModalTodo = ({}: ModalTodoProps) => {
  const { hideDatePicker, isDatePickerVisible, showDatePicker } = useTime();

  const {
    selectedDate,
    refetch,
    setModalVisible,
    modalVisible,
    selectedTask,
    showNotification,
    agendaForm,
  } = useAgenda();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = agendaForm;

  const closeModal = () => {
    setModalVisible(false);
    reset();
  };

  /**
   * Handles the submission of the todo form. If the todo is being edited (i.e. `selectedTask` is truthy),
   * it will be updated, otherwise a new todo will be added.
   * @param formData The validated form data.
   */
  const onSubmit = async (formData: z.infer<typeof todoSchema>) => {
    const todoData = {
      name: formData.title,
      time: formData.time,
      status: formData.status,
    };

    if (selectedTask) {
      await updateTodo(selectedDate, selectedTask.name, todoData);
      showNotification(
        "Todo Updated",
        `"${selectedTask.name}" has been updated.`
      );
    } else {
      await addTodo({
        title: selectedDate,
        data: todoData,
      });
      showNotification("Todo Added", `"${todoData.name}" has been added.`);
    }

    refetch();
    closeModal();
  };

  return (
    <>
      <ModalWrapper
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <ButtonIcon setModalVisible={closeModal} size={12} variant="cross" />

        <View style={tw`mb-2`}>
          <Text style={tw`text-lg font-bold`}>
            {selectedTask ? "Edit Todo" : "Add Todo"}
          </Text>
        </View>

        <View style={tw`flex-1 flex flex-col justify-between`}>
          <View>
            {/* title */}
            <TitleInput control={control} errors={errors} />

            {/* time */}
            <TimeInput
              control={control}
              errors={errors}
              showDatePicker={showDatePicker}
              getValues={getValues}
            />

            {/* status */}
            {selectedTask && <StatusInput control={control} errors={errors} />}

            {/* time */}
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={(time) => {
                      const formattedTime = format(time, "hh:mm aa");
                      onChange(formattedTime);
                      hideDatePicker();
                    }}
                    onCancel={hideDatePicker}
                  />
                </>
              )}
            />
          </View>

          <Button
            title={selectedTask ? "Edit Todo" : "Add Todo"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ModalWrapper>
    </>
  );
};

export default ModalTodo;
