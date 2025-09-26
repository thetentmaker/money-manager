import {
  useRootNavigation,
  useRootRoute,
} from '../../navigations/RootNavigation';

const useCalendarSelect = () => {
  const navigation = useRootNavigation<'CalendarSelect'>();
  const route = useRootRoute<'CalendarSelect'>();
  return {
    goBack: () => {
      navigation.goBack();
    },
    onDayPress: (time: number) => {
      route.params.onSelectDay(time);
      navigation.goBack();
    },
  };
};

export default useCalendarSelect;
