import { View, StyleSheet } from 'react-native';
import Header from '../../designsystem/Header';

const AddUpdateScreen = () => {
  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>Monthly screen</Header.Title>
        <Header.Icon name="close" onPress={() => {}} />
      </Header>
    </View>
  );
};

export default AddUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
