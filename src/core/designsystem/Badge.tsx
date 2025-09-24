import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface BadgeProps {
  text: string | number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
  textStyle?: TextStyle;
  maxWidth?: number;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  size = 'medium',
  variant = 'primary',
  style,
  textStyle,
  maxWidth,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 8,
          minHeight: 16,
        };
      case 'large':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          minHeight: 32,
        };
      default: // medium
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          minHeight: 24,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#6c757d',
          textColor: '#fff',
        };
      case 'success':
        return {
          backgroundColor: '#28a745',
          textColor: '#fff',
        };
      case 'warning':
        return {
          backgroundColor: '#ffc107',
          textColor: '#000',
        };
      case 'error':
        return {
          backgroundColor: '#dc3545',
          textColor: '#fff',
        };
      case 'info':
        return {
          backgroundColor: '#17a2b8',
          textColor: '#fff',
        };
      default: // primary
        return {
          backgroundColor: '#007bff',
          textColor: '#fff',
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 14;
      default: // medium
        return 12;
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();
  const textSize = getTextSize();

  return (
    <View
      style={[
        styles.badge,
        sizeStyles,
        {
          backgroundColor: variantStyles.backgroundColor,
          maxWidth,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.textColor,
            fontSize: textSize,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
