import { TaskDetailType } from "@/constants/DataDummy";
import React, { useCallback, useState } from "react";

const useModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDetailType | null>(null);

  const handleItemPress = useCallback(
    (item: TaskDetailType) => {
      setSelectedTask(item);
      setModalVisible(true);
    },
    [setModalVisible]
  );

  const handleAddTodo = useCallback(() => {
    setSelectedTask(null);
    setModalVisible(true);
  }, [setModalVisible]);

  return {
    modalVisible,
    setModalVisible,
    handleAddTodo,
    handleItemPress,
    selectedTask,
  };
};

export default useModal;
