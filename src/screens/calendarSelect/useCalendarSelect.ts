import { useMemo } from 'react';
import {
  useRootNavigation,
  useRootRoute,
} from '../../navigations/RootNavigation';

const useCalendarSelect = () => {
  const navigation = useRootNavigation<'CalendarSelect'>();
  const route = useRootRoute<'CalendarSelect'>();

  const getTodayTime = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setMinutes(0, 0, 0);
    return today.getTime();
  }, []);
  return {
    goBack: () => {
      navigation.goBack();
    },
    onDayPress: (time: number) => {
      route.params.onSelectDay(time);
      navigation.goBack();
    },
    getTodayTime,
  };
};

export default useCalendarSelect;
