import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  style?: ViewStyle;
}

const Spacer: React.FC<SpacerProps> = ({
  size = 16,
  horizontal = false,
  style,
}) => {
  const spacerStyle = horizontal
    ? { width: size }
    : { height: size };

  return <View style={[spacerStyle, style]} />;
};

// Predefined spacer components for common use cases
export const SpacerXS: React.FC<Omit<SpacerProps, 'size'>> = (props) => (
  <Spacer size={4} {...props} />
);

export const SpacerSM: React.FC<Omit<SpacerProps, 'size'>> = (props) => (
  <Spacer size={8} {...props} />
);

export const SpacerMD: React.FC<Omit<SpacerProps, 'size'>> = (props) => (
  <Spacer size={16} {...props} />
);

export const SpacerLG: React.FC<Omit<SpacerProps, 'size'>> = (props) => (
  <Spacer size={24} {...props} />
);

export const SpacerXL: React.FC<Omit<SpacerProps, 'size'>> = (props) => (
  <Spacer size={32} {...props} />
);

export const SpacerXXL: React.FC<Omit<SpacerProps, 'size'>> = (props) => (
  <Spacer size={48} {...props} />
);

// Horizontal spacers
export const HorizontalSpacerXS: React.FC<Omit<SpacerProps, 'size' | 'horizontal'>> = (props) => (
  <Spacer size={4} horizontal {...props} />
);

export const HorizontalSpacerSM: React.FC<Omit<SpacerProps, 'size' | 'horizontal'>> = (props) => (
  <Spacer size={8} horizontal {...props} />
);

export const HorizontalSpacerMD: React.FC<Omit<SpacerProps, 'size' | 'horizontal'>> = (props) => (
  <Spacer size={16} horizontal {...props} />
);

export const HorizontalSpacerLG: React.FC<Omit<SpacerProps, 'size' | 'horizontal'>> = (props) => (
  <Spacer size={24} horizontal {...props} />
);

export const HorizontalSpacerXL: React.FC<Omit<SpacerProps, 'size' | 'horizontal'>> = (props) => (
  <Spacer size={32} horizontal {...props} />
);

export const HorizontalSpacerXXL: React.FC<Omit<SpacerProps, 'size' | 'horizontal'>> = (props) => (
  <Spacer size={48} horizontal {...props} />
);

export default Spacer;