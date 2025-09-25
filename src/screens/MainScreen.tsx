import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../designsystem/Header';
import AccountHistoryListItemView from '../components/AccountHistoryListItemView';
import useMain from '../hooks/useMain';
import Button from '../designsystem/Button';
import Icon from '../designsystem/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SQLite, { SQLiteDatabase, SQLError } from 'react-native-sqlite-storage';
import { useEffect } from 'react';

const MainScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const { list, onPressItem } = useMain();
  const { onPressAdd } = useMain();

  useEffect(() => {
    const onDbError = (err: SQLError) => {
      console.log('Open database error', err);
    };
    const onDbSuccess = (dbConn: SQLiteDatabase) => {
      console.log('Open database success', dbConn);
    };
    SQLite.openDatabase(
      { name: 'account_history.db',
        location: 'default',
        createFromLocation: "~www/account_history.db",
      },
      onDbSuccess,
      onDbError,
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>MAIN</Header.Title>
        <Header.Icon name="close" onPress={() => {}} />
      </Header>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <AccountHistoryListItemView item={item} onPressItem={onPressItem} />
        )}
      />
      <Button
        style={[{ bottom: safeAreaInsets.bottom + 12 }, styles.floatingButton]}
        onPress={onPressAdd}
      >
        <Icon name="plus" size={30} color="white" style={styles.plusIcon} />
      </Button>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    right: 12,
  },
  plusIcon: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
