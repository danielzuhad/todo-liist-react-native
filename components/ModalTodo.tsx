import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import ButtonIcon from "./ButtonIcon";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/schema/todoSchema";
import useTime from "@/hooks/useTime";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { z } from "zod";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import ModalWrapper from "./ui/ModalWrapper";
import { TaskDetailType } from "@/constants/DataDummy";
import TitleInput from "./Input/TitleInput";
import TimeInput from "./Input/TimeInput";
import { addTodo, updateTodo } from "@/utils/storage";
import StatusInput from "./Input/StatusInput";

interface ModalTodoProps {
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  editItem?: TaskDetailType | null;
}

const ModalTodo = ({
  visible,
  setModalVisible,
  selectedDate,
  refetch,
  editItem,
}: ModalTodoProps) => {
  const { hideDatePicker, isDatePickerVisible, showDatePicker } = useTime();

  const closeModal = () => {
    setModalVisible(false);
    reset();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: editItem?.name || "",
      time: editItem?.time || "",
      status: editItem?.status || "Pending",
    },
  });

  const onSubmit = async (formData: z.infer<typeof todoSchema>) => {
    const todoData = {
      name: formData.title,
      time: formData.time,
      status: formData.status,
    };

    if (editItem) {
      await updateTodo(selectedDate, editItem.name, todoData);
    } else {
      await addTodo({
        title: selectedDate,
        data: todoData,
      });
    }

    refetch();
    closeModal();
  };

  useEffect(() => {
    if (editItem) {
      setValue("title", editItem.name);
      setValue("time", editItem.time);
      setValue("status", editItem.status);
    }
  }, [editItem, setValue, reset, visible]);

  return (
    <>
      <ModalWrapper visible={visible} onClose={() => setModalVisible(false)}>
        <ButtonIcon setModalVisible={closeModal} size={12} variant="cross" />

        <View style={tw`mb-2`}>
          <Text style={tw`text-lg font-bold`}>
            {editItem ? "Edit Todo" : "Add Todo"}
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
            {editItem && <StatusInput control={control} errors={errors} />}

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
            title={editItem ? "Edit Todo" : "Add Todo"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ModalWrapper>
    </>
  );
};

export default ModalTodo;
