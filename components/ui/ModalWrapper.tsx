import React from "react";
import { Modal, View } from "react-native";
import tw from "tailwind-react-native-classnames";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      onRequestClose={onClose}
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={tw`flex-1  items-center justify-center `}>
        <View
          style={tw`w-3/4 h-1/3 border border-gray-300 bg-white flex p-4 rounded-2xl shadow-sm relative`}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;
