import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface MultiLineInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  maxLength?: number;
  numberOfLines?: number;
  height?: number;
  fontSize?: number;
  style?: any;
  error?: string;
  disabled?: boolean;
}

const MultiLineInput: React.FC<MultiLineInputProps> = ({
  placeholder = "내용을 입력하세요",
  value,
  onChangeText,
  onSubmitEditing,
  maxLength = 500,
  numberOfLines = 4,
  height,
  fontSize,
  style,
  error,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
          disabled && styles.disabledInput,
          height && { height },
          fontSize && { fontSize },
          style,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        textAlignVertical="top"
      />
      {maxLength && (
        <Text style={styles.characterCount}>
          {value?.length || 0}/{maxLength}
        </Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 100,
  },
  focusedInput: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  errorInput: {
    borderColor: "#FF3B30",
    borderWidth: 2,
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#999999",
  },
  characterCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
});

export default MultiLineInput;