import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../designsystem/Header';
import AccountHistoryListItemView from '../../components/AccountHistoryListItemView';
import useMain from './useMain';
import Button from '../../designsystem/Button';
import Icon from '../../designsystem/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../../designsystem/Typography';
import Spacer from '../../designsystem/Spacer';
import Divider from '../../designsystem/Divider';

const MainScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const {
    list,
    onPressItem,
    onPressAdd,
    totalUsage,
    totalIncome,
    onPressMonthly,
  } = useMain();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>MAIN</Header.Title>
      </Header>
      <FlatList
        data={list}
        ListHeaderComponent={
          <>
            <Button onPress={onPressMonthly}>
              <View style={styles.monthlyButtonContainer}>
                <View style={styles.monthlyButton}>
                  <Typography variant="body1" color="gray">
                    이번달 총 사용 금액
                  </Typography>
                  <Spacer size={12} />
                  <Typography variant="h1" color="black">
                    {totalUsage}원
                  </Typography>
                </View>
                <View style={styles.monthlyButton}>
                  <Typography variant="body1" color="gray">
                    이번달 총 수입 금액
                  </Typography>
                  <Spacer size={12} />
                  <Typography variant="h1" color="black">
                    {totalIncome}원
                  </Typography>
                </View>
                <Divider thickness={10} />
              </View>
            </Button>
          </>
        }
        renderItem={({ item }) => {
          try {
            return (
              <AccountHistoryListItemView
                item={item}
                onPressItem={onPressItem}
              />
            );
          } catch (error) {
            return null;
          }
        }}
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
  header: {
    padding: 16,
  },
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
  monthlyButton: {
    alignItems: 'center',
  },
  monthlyButtonContainer: {
    justifyContent: 'space-between',
  },
});
