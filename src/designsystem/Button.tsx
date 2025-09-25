import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface ButtonProps {
  children?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
  style,
  onPressIn,
  onPressOut,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    // 기본 스타일 없음 - style prop으로 모든 스타일링 처리
  },
});
