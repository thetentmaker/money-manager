import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRootNavigation } from '../../navigations/RootNavigation';
import useAccountBookHistoryDb from '../../hooks/useAccountBookHistoryDb';
import { Dimensions } from 'react-native';

const useMonthly = () => {
  const navigation = useRootNavigation<'MonthlyAverage'>();
  const [average, setAverage] = useState<{ month: number; data: number[] }[]>(
    [],
  );
  const { getMonthlyAverage } = useAccountBookHistoryDb();
  const { width } = Dimensions.get('window');
  const chartSize = useMemo(
    () => ({
      width: width,
      height: 220,
    }),
    [width],
  );
  const getAverage = useCallback(async () => {
    setAverage(await getMonthlyAverage());
  }, [getMonthlyAverage]);

  useEffect(() => {
    getAverage();
  }, [getAverage]);

  return {
    onPressClose: () => navigation.goBack(),
    onPressItem: () => navigation.push('MonthlyAverage'),
    chartSize,
    chartLabels: average.map(item => `${item.month.toString()}월`),
    chartData: average.map(item => item.data),
    chartBarColors: ['#dfe4ea', '#a4b0be'],
    chartLegend: ['사용', '수입'],
  };
};

export default useMonthly;
