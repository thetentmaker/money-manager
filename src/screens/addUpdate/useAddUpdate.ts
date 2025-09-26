import { useCallback, useMemo, useState } from 'react';
import { useRootNavigation, useRootRoute } from '../../navigations/RootNavigation';
import AccountBookHistory from '../../data/AccountBookHistory';
import { convertToDateString } from '../../utils/DateUtils';

const useAddUpdate = () => {
  const navigation = useRootNavigation<'Add' | 'Update'>();
  const route = useRootRoute<'Add' | 'Update'>();
  const [item, setItem] = useState<AccountBookHistory>(
    route.params?.item ??
      ({
        type: '사용',
        price: 0,
        comment: '',
        date: 0,
        createdAt: 0,
        updatedAt: 0,
        photoUrl: null,
      } as AccountBookHistory),
  );

  const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
    type => {
      if (route.name === 'Update') return;

      setItem(prevItem => ({ ...prevItem, type }));
    },
    [route.name],
  );

  const onChangePrice = useCallback<(text: string) => void>(text => {
    if (text === '') {
      setItem(prevItem => ({ ...prevItem, price: 0 }));
      return;
    }
    if (isNaN(parseInt(text, 10))) return;

    setItem(prevItem => ({
      ...prevItem,
      price: parseInt(text, 10),
    }));
  }, []);

  const priceValue = item.price === 0 ? '' : item.price.toString();

  const onChangeComment = useCallback<(text: string) => void>(text => {
    setItem(prevItem => ({ ...prevItem, comment: text }));
  }, []);

  const onPressCalendar = useCallback(() => {
    console.log('onPressCalendar');
  }, []);

  const onPressSave = useCallback(() => {
    console.log('onPressSave');
  }, []);

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const ctaButtonName = useMemo(() => {
    return route.name === 'Add' ? '저장하기' : '수정하기';
  }, [route.name]);

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

  const calendarColorStyle = useMemo(() => {
    return item.date === 0
      ? {
          borderColor: 'lightgray',
        }
      : {
          borderColor: 'gray',
        };
  }, [item.date]);

  const calendarDisplayText = useMemo(() => {
    return item.date === 0
      ? '날짜를 선택하세요'
      : convertToDateString(item.date);
  }, [item.date]);

  const commentValue = item.comment;
  
  return {
    item,
    setItem,
    onPressType,
    onChangePrice,
    priceValue,
    onChangeComment,
    commentValue,
    onPressCalendar,
    onPressSave,
    onPressClose,
    ctaButtonName,
    usageColorStyle,
    incomeColorStyle,
    usageTextColor,
    incomeTextColor,
    calendarColorStyle,
    calendarDisplayText,
  };
};

export default useAddUpdate;
