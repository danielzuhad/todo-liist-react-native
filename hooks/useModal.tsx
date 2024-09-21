import React from "react";

const useModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return {
    modalVisible,
    setModalVisible,
  };
};

export default useModal;
