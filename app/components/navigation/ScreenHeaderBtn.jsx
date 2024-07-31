import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ScreenHeaderBtn = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="menu" size={32} color="#fff" />
    </TouchableOpacity>
  );
};
export default ScreenHeaderBtn;
