import AccountBookHistory from '../data/AccountBookHistory';
import Button from '../designsystem/Button';
import { StyleSheet, View } from 'react-native';
import Icon from '../designsystem/Icons';
import Typography from '../designsystem/Typography';
import Spacer from '../designsystem/Spacer';
import RemoteImage from '../designsystem/RemoteImage';
import { convertToDateString } from '../utils/DateUtils';
import { useMemo } from 'react';

interface AccountHistoryListItemViewProps {
  item: AccountBookHistory;
  onPressItem: (item: AccountBookHistory) => void;
}

const AccountHistoryListItemView = ({
  item,
  onPressItem,
}: AccountHistoryListItemViewProps) => {
  const { iconName, iconColor, displayCreateAt, displayContent, photoUrl } =
    useAccountHistoryListItemView(item);

  return (
    <Button onPress={() => onPressItem(item)}>
      <View style={styles.container}>
        <Icon name={iconName} size={24} color={iconColor} />
        <View style={styles.content}>
          <Typography variant="body1">{displayContent}</Typography>
          <Spacer size={4} />
          <Typography variant="body2">{displayCreateAt}</Typography>
        </View>
        {photoUrl && (
          <>
            <Spacer size={12} horizontal />
            <RemoteImage
              uri={photoUrl}
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

const useAccountHistoryListItemView = (item: AccountBookHistory) => {
  const iconName = item.type === '사용' ? 'minus' : 'plus';
  const iconColor = item.type === '사용' ? 'red' : 'blue';
  const displayCreateAt = useMemo(
    () => convertToDateString(item.createdAt),
    [item.createdAt],
  );

  const displayContent = useMemo(() => {
    return item.comment + ' | ' + item.price + '원';
  }, [item.comment, item.price]);

  const photoUrl = useMemo(() => {
    return item.photoUrl;
  }, [item.photoUrl]);

  return {
    iconName,
    iconColor,
    displayCreateAt,
    displayContent,
    photoUrl,
  };
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
