import AccountBookHistory from '../../data/AccountBookHistory';
import { useCallback, useMemo, useState } from 'react';
import { useRootNavigation } from '../../navigations/RootNavigation';
import useAccountBookHistoryDb from '../../hooks/useAccountBookHistoryDb';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useMain = () => {
  const navigation = useRootNavigation();
  const { getList, getMonthlyAverage } = useAccountBookHistoryDb();
  const [list, setList] = useState<AccountBookHistory[]>([]);
  const { width } = Dimensions.get('window');

  const [average, setAverage] = useState<{ month: number; data: number[] }[]>(
    [],
  );
  
  const fetchList = useCallback(async () => {
    setList(await getList());
    const monthlyAverage = await getMonthlyAverage();
    setAverage(monthlyAverage);
  }, [getList, getMonthlyAverage]);

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

  const chartSize = useMemo(
    () => ({
      width: width,
      height: 220,
    }),
    [width],
  );

  // 이번달 총 사용 금액
  const totalUsage = useMemo(() => {
    return average
      .map(item => item.data[0])
      .reduce((acc, curr) => acc + curr, 0);
  }, [average]);

  // 이번달 총 수입 금액
  const totalIncome = useMemo(() => {
    return average
      .map(item => item.data[1])
      .reduce((acc, curr) => acc + curr, 0);
  }, [average]);

  return {
    onPressMonthly: () => {
      navigation.push('MonthlyAverage');
    },
    totalUsage,
    totalIncome,
    list,
    onPressItem,
    onPressAdd,
    onPressClose: () => navigation.goBack(),
    chartSize,
    chartLabels: average.map(item => `${item.month.toString()}월`),
    chartData: average.map(item => item.data),
    chartBarColors: ['#dfe4ea', '#a4b0be'],
    chartLegend: ['사용', '수입'],
  };
};

export default useMain;
