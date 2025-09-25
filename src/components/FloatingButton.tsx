import Icon from '../designsystem/Icons';
import Button from '../designsystem/Button';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

const FloatingButton = ({
  style,
  onPress,
}: {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}) => {
  return (
    <Button style={[style]} onPress={onPress}>
      <Icon name="plus" size={30} color="white" style={styles.plusIcon} />
    </Button>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  plusIcon: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
