import React, { useState } from "react";
import {
  ActivityIndicator,
  DimensionValue,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface LocalImageProps {
  source: any; // require() result or ImageSourcePropType
  width?: DimensionValue;
  height?: DimensionValue;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  showLoading?: boolean;
  loadingColor?: string;
  fallbackText?: string;
  borderRadius?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const LocalImage: React.FC<LocalImageProps> = ({
  source,
  width,
  height,
  resizeMode = "cover",
  style,
  containerStyle,
  showLoading = true,
  loadingColor = "#007bff",
  fallbackText = "이미지를 불러올 수 없습니다",
  borderRadius = 0,
  onLoad,
  onError,
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

  if (error) {
    return (
      <View style={containerStyles}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{fallbackText}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyles}>
      <Image
        source={source}
        style={imageStyles}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
      />
      {loading && showLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={loadingColor} />
        </View>
      )}
    </View>
  );
};

export default LocalImage;

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
