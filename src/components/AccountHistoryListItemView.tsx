import AccountBookHistory from '../data/AccountBookHistory';
import Button from '../designsystem/Button';
import { StyleSheet, View } from 'react-native';
import Icon from '../designsystem/Icons';
import Typography from '../designsystem/Typography';
import Spacer from '../designsystem/Spacer';
import RemoteImage from '../designsystem/RemoteImage';

interface AccountHistoryListItemViewProps {
  item: AccountBookHistory;
  onPressItem: (item: AccountBookHistory) => void;
}

const AccountHistoryListItemView = ({
  item,
  onPressItem,
}: AccountHistoryListItemViewProps) => {
  const iconName = item.type === '사용' ? 'remove-circle' : 'add-circle';
  const iconColor = item.type === '사용' ? 'red' : 'blue';
  return (
    <Button onPress={() => onPressItem(item)}>
      <View style={styles.container}>
        <Icon name={iconName} size={24} color={iconColor} />
        <View style={styles.content}>
          <Typography variant="body1">{item.comment}</Typography>
          <Spacer size={4} />
          <Typography variant="body2">
            {item.createdAt.toLocaleString()}
          </Typography>
        </View>
        {item.photoUrl && (
          <>
            <Spacer size={12} horizontal />
            <RemoteImage
              uri={item.photoUrl}
              width={100}
              height={100}
              style={styles.photo}
            />
          </>
        )}
      </View>
    </Button>
  );
};

export default AccountHistoryListItemView;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
