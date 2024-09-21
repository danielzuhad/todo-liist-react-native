import { iconStyle } from "@/constants/IconStyel";
import { Plus, X } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import tw from "tailwind-react-native-classnames";

/**
 * A button that floats at the bottom right of the screen, with a blue plus icon.
 * It's used to create a new task.
 */

interface ButtonIconProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  size?: number;
  variant?: "plus" | "cross";
}

const ButtonIcon = ({
  setModalVisible,
  size = 12,
  variant = "plus",
}: ButtonIconProps) => {
  return (
    <>
      <Pressable
        style={tw`absolute   rounded-full w-${size} h-${size} items-center justify-center  ${
          variant === "plus"
            ? "bottom-5 right-5 bg-blue-500"
            : "-top-5 -right-5 bg-red-500"
        }`}
        onPress={() => setModalVisible(true)}
      >
        {variant === "cross" ? (
          <X {...iconStyle} size={28} color={"white"} />
        ) : (
          <Plus {...iconStyle} size={28} color={"white"} />
        )}
      </Pressable>
    </>
  );
};

export default ButtonIcon;
