import { Ionicons, IoniconsIconName } from "@react-native-vector-icons/ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  children?: React.ReactNode;
}

interface HeaderTitleProps {
  children: React.ReactNode;
}

interface HeaderIconProps {
  name: IoniconsIconName;
  onPress?: () => void;
  size?: number;
  color?: string;
}

const Header: React.FC<HeaderProps> & {
  Title: React.FC<HeaderTitleProps>;
  Icon: React.FC<HeaderIconProps>;
} = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>{children}</View>
    </SafeAreaView>
  );
};

const HeaderTitle: React.FC<HeaderTitleProps> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const HeaderIcon: React.FC<HeaderIconProps> = ({ 
  name, 
  onPress, 
  size = 24, 
  color = "#333" 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;

export default Header;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#e0e0e0",
    width: "100%",
  },
  headerContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 20,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  iconButton: {
    marginLeft: -5,
    marginRight: 8,
  },
});
