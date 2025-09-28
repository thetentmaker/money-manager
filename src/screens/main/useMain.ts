import AccountBookHistory from '../../data/AccountBookHistory';
import { useCallback, useState } from 'react';
import { useRootNavigation } from '../../navigations/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';
import useAccountBookHistoryDb from '../../hooks/useAccountBookHistoryDb';

const useMain = () => {
  const navigation = useRootNavigation();
  const { getList } = useAccountBookHistoryDb();
  const [list, setList] = useState<AccountBookHistory[]>([]);

  const fetchList = useCallback(async () => {
    const list = await getList();
    setList(list);
  }, [getList]);

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList]),
  );

  const onPressItem = (item: AccountBookHistory) => {
    navigation.push('Detail', { item });
  };

  const onPressAdd = () => {
    navigation.push('Add');
  };

  return {
    list,
    onPressItem,
    onPressAdd,
    onPressClose: () => {
      console.log('onPressClose TEST');
      getList();
    },
  };
};

export default useMain;
