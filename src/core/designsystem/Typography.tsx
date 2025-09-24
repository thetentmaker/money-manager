import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body1",
  color = "#000",
  align = "left",
  weight = 'normal',
  style,
  numberOfLines,
  onPress,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: 32,
          lineHeight: 40,
          fontWeight: "700" as const,
        };
      case 'h2':
        return {
          fontSize: 28,
          lineHeight: 36,
          fontWeight: "600" as const,
        };
      case 'h3':
        return {
          fontSize: 24,
          lineHeight: 32,
          fontWeight: "600" as const,
        };
      case 'h4':
        return {
          fontSize: 20,
          lineHeight: 28,
          fontWeight: "600" as const,
        };
      case 'h5':
        return {
          fontSize: 18,
          lineHeight: 24,
          fontWeight: "600" as const,
        };
      case 'h6':
        return {
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "600" as const,
        };
      case 'body1':
        return {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "400" as const,
        };
      case 'body2':
        return {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "400" as const,
        };
      case 'caption':
        return {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: "400" as const,
        };
      case 'overline':
        return {
          fontSize: 10,
          lineHeight: 14,
          fontWeight: "500" as const,
          textTransform: "uppercase" as const,
          letterSpacing: 1.5,
        };
      default:
        return {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '400' as const,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Text
      style={[
        styles.text,
        variantStyles,
        {
          color,
          textAlign: align,
          fontWeight: weight,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

// Predefined typography components
export const H1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const H2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const H3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const H4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const H5: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h5" {...props} />
);

export const H6: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h6" {...props} />
);

export const Body1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body1" {...props} />
);

export const Body2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body2" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Overline: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="overline" {...props} />
);

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default Typography;
