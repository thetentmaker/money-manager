import { View, StyleSheet } from 'react-native';
import Header from '../designsystem/Header';
import { useRootNavigation } from '../navigations/RootNavigation';

const AddUpdateScreen = () => {
  const navigation = useRootNavigation();
  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>Detail screen</Header.Title>
        <Header.Icon name="close" onPress={navigation.goBack} />
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
