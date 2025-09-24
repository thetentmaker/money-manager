import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

type AnyIcon = typeof Ionicons | typeof Octicons;
const mapping: Record<string, { Component: AnyIcon; glyph: string }> = {
  // Social
  heart: { Component: Ionicons, glyph: 'heart' },
  like: { Component: Ionicons, glyph: 'thumbs-up' },
  bookmark: { Component: Ionicons, glyph: 'bookmark' },
  comment: { Component: Ionicons, glyph: 'chatbubble-ellipses' },
  share: { Component: Ionicons, glyph: 'share-social' },
  star: { Component: Ionicons, glyph: 'star' },

  // UI / Navigation
  menu: { Component: Ionicons, glyph: 'menu' },
  more: { Component: Ionicons, glyph: 'ellipsis-horizontal' },
  search: { Component: Ionicons, glyph: 'search' },
  settings: { Component: Ionicons, glyph: 'settings' },
  home: { Component: Ionicons, glyph: 'home' },
  user: { Component: Ionicons, glyph: 'person' },
  camera: { Component: Ionicons, glyph: 'camera' },
  image: { Component: Ionicons, glyph: 'image' },
  notification: { Component: Ionicons, glyph: 'notifications' },
  back: { Component: Ionicons, glyph: 'chevron-back' },
  forward: { Component: Ionicons, glyph: 'chevron-forward' },
  'arrow-left': { Component: Ionicons, glyph: 'chevron-back' },
  'arrow-right': { Component: Ionicons, glyph: 'chevron-forward' },
  arrowLeft: { Component: Ionicons, glyph: 'chevron-back' },
  arrowRight: { Component: Ionicons, glyph: 'chevron-forward' },

  // Actions
  plus: { Component: Ionicons, glyph: 'add' },
  minus: { Component: Ionicons, glyph: 'remove' },
  close: { Component: Ionicons, glyph: 'close' },
  check: { Component: Ionicons, glyph: 'checkmark' },
};

export type IconName = keyof typeof mapping;
interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  const fallback = { Component: Octicons, glyph: 'question' };
  const { Component, glyph } = mapping[name] || fallback;

  return (
    <Component name={glyph as any} size={size} color={color} style={style as any} />
  );
};

// Predefined icon components for common use cases
export const ArrowLeftIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="arrow-left" {...props} />
);

export const ArrowRightIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="arrow-right" {...props} />
);

export const PlusIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="plus" {...props} />
);

export const MinusIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="minus" {...props} />
);

export const CloseIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="close" {...props} />
);

export const CheckIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="check" {...props} />
);

export const SearchIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="search" {...props} />
);

export const SettingsIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="settings" {...props} />
);

export const HeartIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="heart" {...props} />
);

export const StarIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="star" {...props} />
);

export const ShareIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="share" {...props} />
);

export const DownloadIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="download" {...props} />
);

export const PlayIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="play" {...props} />
);

export const PauseIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="pause" {...props} />
);

export const HomeIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="home" {...props} />
);

export const UserIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="user" {...props} />
);

export const NotificationIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="notification" {...props} />
);

export const CameraIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="camera" {...props} />
);

export const ImageIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="image" {...props} />
);


export default Icon;