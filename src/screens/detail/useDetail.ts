import { useCallback, useMemo, useState } from 'react';
import AccountBookHistory from '../../data/AccountBookHistory';
import { convertToDateString } from '../../utils/DateUtils';
import {
  useRootNavigation,
  useRootRoute,
} from '../../navigations/RootNavigation';

const useDetail = () => {
  const navigation = useRootNavigation<'Detail'>();
  const route = useRootRoute<'Detail'>();
  const [item, setItem] = useState<AccountBookHistory>(route.params.item);

  const usageColorStyle = useMemo(() => {
    return item.type === '사용'
      ? {
          backgroundColor: 'black',
          borderColor: 'black',
        }
      : {
          backgroundColor: 'white',
          borderColor: 'gray',
        };
  }, [item.type]);

  const incomeColorStyle = useMemo(() => {
    return item.type === '수입'
      ? {
          backgroundColor: 'black',
          borderColor: 'black',
        }
      : {
          backgroundColor: 'white',
          borderColor: 'gray',
        };
  }, [item.type]);

  const usageTextColor = useMemo(() => {
    return item.type === '사용' ? 'white' : 'black';
  }, [item.type]);

  const incomeTextColor = useMemo(() => {
    return item.type === '수입' ? 'white' : 'black';
  }, [item.type]);

  const calendarDisplayText = useMemo(
    () => convertToDateString(item.date),
    [item.date],
  );

  const photoUrl = useMemo(() => {
    return item.photoUrl;
  }, [item.photoUrl]);

  const ctaButtonName = useMemo(() => {
    return '수정하기';
  }, []);

  const calendarColorStyle = useMemo(() => {
    return item.date === 0
      ? {
          borderColor: 'lightgray',
        }
      : {
          borderColor: 'gray',
        };
  }, [item.date]);

  const onPressUpdate = useCallback(() => {
    navigation.push('Update', {
      item: route.params.item,
      onChangeData: setItem,
    });
  }, [navigation, route.params.item]);

  const displayPrice = useMemo(() => {
    return item.price === 0 ? '0원' : item.price.toString() + '원';
  }, [item.price]);

  const displayComment = useMemo(() => {
    return item.comment;
  }, [item.comment]);

  return {
    usageColorStyle,
    incomeColorStyle,
    usageTextColor,
    incomeTextColor,
    calendarDisplayText,
    photoUrl,
    ctaButtonName,
    calendarColorStyle,
    onPressUpdate,
    displayPrice,
    displayComment,
  };
};

export default useDetail;
