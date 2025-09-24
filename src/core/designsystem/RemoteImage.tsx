import React, { useState } from "react";
import {
  ActivityIndicator,
  DimensionValue,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface RemoteImageProps {
  uri: string;
  width?: DimensionValue;
  height?: DimensionValue;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  showLoading?: boolean;
  loadingColor?: string;
  fallbackText?: string;
  borderRadius?: number;
  onLoad?: () => void;
  onError?: () => void;
  onPress?: () => void;
  placeholder?: React.ReactNode;
  cache?: "default" | "reload" | "force-cache" | "only-if-cached";
  priority?: 'low' | 'normal' | 'high';
}

const RemoteImage: React.FC<RemoteImageProps> = ({
  uri,
  width,
  height,
  resizeMode = "cover",
  style,
  containerStyle,
  showLoading = true,
  loadingColor = "#007bff",
  fallbackText = '이미지를 불러올 수 없습니다',
  borderRadius = 0,
  onLoad,
  onError,
  onPress,
  placeholder,
  cache = "default",
  priority = "normal",
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
  };

  const imageStyles = [
    styles.image,
    {
      width,
      height,
      borderRadius,
    },
    style,
  ];

  const containerStyles = [
    styles.container,
    {
      width,
      height,
      borderRadius,
    },
    containerStyle,
  ];

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{fallbackText}</Text>
        </View>
      );
    }

    if (loading && placeholder) {
      return placeholder;
    }

    return (
      <>
        <Image
          source={{
            uri,
            cache,
          }}
          style={imageStyles as StyleProp<ImageStyle>}
          resizeMode={resizeMode}
          onLoad={handleLoad}
          onError={handleError}
        />
        {loading && showLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={loadingColor} />
          </View>
        )}
      </>
    );
  };

  const content = renderContent();

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyles as StyleProp<ViewStyle>}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyles as StyleProp<ViewStyle>}>{content}</View>;
};

export default RemoteImage;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  errorText: {
    color: "#6c757d",
    fontSize: 12,
    textAlign: "center",
  },
});
