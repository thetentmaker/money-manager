import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Icon, { IconName } from './Icons';

interface TabIconProps {
  name: IconName;
  label?: string;
  focused?: boolean;
  size?: number;
  color?: string;
  focusedColor?: string;
  labelColor?: string;
  focusedLabelColor?: string;
  showLabel?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  badge?: string | number;
  badgeColor?: string;
  badgeTextColor?: string;
}

const TabIcon: React.FC<TabIconProps> = ({
  name,
  label,
  focused = false,
  size = 24,
  color = '#8e8e93',
  focusedColor = '#007bff',
  labelColor = '#8e8e93',
  focusedLabelColor = '#007bff',
  showLabel = true,
  style,
  labelStyle,
  badge,
  badgeColor = '#ff3b30',
  badgeTextColor = '#fff',
}) => {
  const iconColor = focused ? focusedColor : color;
  const textColor = focused ? focusedLabelColor : labelColor;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon
          name={name}
          size={size}
          color={iconColor}
        />
        {badge && (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={[styles.badgeText, { color: badgeTextColor }]}>
              {badge}
            </Text>
          </View>
        )}
      </View>
      {showLabel && label && (
        <Text
          style={[
            styles.label,
            { color: textColor },
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

// Predefined tab icons for common use cases
export const HomeTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="home" label="홈" {...props} />
);

export const SearchTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="search" label="검색" {...props} />
);

export const ProfileTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="user" label="프로필" {...props} />
);

export const SettingsTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="settings" label="설정" {...props} />
);

export const NotificationTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="notification" label="알림" {...props} />
);

export const MessageTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="message" label="메시지" {...props} />
);

export const CameraTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="camera" label="카메라" {...props} />
);

export const HeartTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="heart" label="좋아요" {...props} />
);

export const StarTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="star" label="즐겨찾기" {...props} />
);

export const BookmarkTabIcon: React.FC<Omit<TabIconProps, 'name'>> = (props) => (
  <TabIcon name="bookmark" label="북마크" {...props} />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: 'center',
  },
});

export default TabIcon;