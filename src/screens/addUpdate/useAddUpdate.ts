import { useCallback, useMemo, useState } from 'react';
import {
  useRootNavigation,
  useRootRoute,
} from '../../navigations/RootNavigation';
import AccountBookHistory from '../../data/AccountBookHistory';
import { convertToDateString } from '../../utils/DateUtils';
import useAccountBookHistoryDb from '../../hooks/useAccountBookHistoryDb';
import { Alert } from 'react-native';

const DEFAULT_ITEM: Omit<AccountBookHistory, 'id'> = {
  type: '사용',
  price: 0,
  comment: '',
  date: 0,
  createdAt: 0,
  updatedAt: 0,
  photoUrl: null,
};

const useAddUpdate = () => {
  const { insertItem, updateItem } = useAccountBookHistoryDb();
  const navigation = useRootNavigation<'Add' | 'Update'>();
  const route = useRootRoute<'Add' | 'Update'>();
  const [item, setItem] = useState<Omit<AccountBookHistory, 'id'>>(() => {
    return route.params?.item ?? { ...DEFAULT_ITEM };
  });

  const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
    type => {
      if (route.name === 'Update') return;

      setItem(prevState => ({ ...prevState, type }));
    },
    [route.name],
  );

  const onChangePrice = useCallback<(text: string) => void>(text => {
    if (text === '') {
      setItem(prevState => ({ ...prevState, price: 0 }));
      return;
    }
    if (isNaN(parseInt(text, 10))) return;

    setItem(prevState => ({
      ...prevState,
      price: parseInt(text, 10),
    }));
  }, []);

  const priceValue = item.price === 0 ? '' : item.price.toString();

  const onChangeComment = useCallback<(text: string) => void>(text => {
    setItem(prevState => ({ ...prevState, comment: text }));
  }, []);

  const onPressCalendar = useCallback(() => {
    navigation.push('CalendarSelect', {
      onSelectDay: (date: number) => {
        setItem(prevState => ({ ...prevState, date }));
      },
    });
  }, [navigation]);

  const onPressSave = useCallback(() => {
    console.log('onPressSave item:', item);
    if (route.name === 'Add') {
      insertItem(item)
        .then(() => {
          navigation.goBack();
        })
        .catch(error => {
          Alert.alert('저장 실패', error.message, [
            {
              text: '확인',
              onPress: () => {},
            },
          ]);
        });
    } else if (route.name === 'Update') {
      updateItem(item)
        .then(() => {
          route.params?.onChangeData(item);
          navigation.goBack();
        })
        .catch(error => {
          Alert.alert('수정 실패', error.message, [
            {
              text: '확인',
              onPress: () => {},
            },
          ]);
        });
    }
  }, [insertItem, item, route.name, navigation, updateItem, route.params]);

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

  const onPressPhoto = useCallback(() => {
    navigation.push('TakePhoto', {
      onTakePhoto: (photoUrl: string) => {
        setItem(prevState => ({ ...prevState, photoUrl }));
      },
    });
  }, [navigation]);
  const photoUrl = useMemo(() => {
    return item.photoUrl;
  }, [item.photoUrl]);

  return {
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
    onPressPhoto,
    photoUrl,
  };
};

export default useAddUpdate;
