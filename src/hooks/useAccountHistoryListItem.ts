import { useMemo } from 'react';
import AccountBookHistory from '../data/AccountBookHistory';
import { convertToDateString } from '../utils/DateUtils';

const useAccountHistoryListItem = (item: AccountBookHistory) => {
  const iconName = item.type === '사용' ? 'minus' : 'plus';
  const iconColor = item.type === '사용' ? 'red' : 'blue';
  const displayCreateAt = useMemo(() => convertToDateString(item.createdAt), [item.createdAt]);
  return {
    iconName,
    iconColor,
    displayCreateAt,
  };
};

export default useAccountHistoryListItem;
