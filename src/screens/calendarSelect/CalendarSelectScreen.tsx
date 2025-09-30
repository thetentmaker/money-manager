import { StyleSheet, View } from 'react-native';
import Header from '../../designsystem/Header';
import useCalendarSelect from './useCalendarSelect';
import { Calendar } from 'react-native-calendars';
import { convertToDateString } from '../../utils/DateUtils';

const CalendarSelectScreen = () => {
  const { goBack, onDayPress, getTodayTime } = useCalendarSelect();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>CalendarSelectScreen</Header.Title>
        <Header.Icon name="close" onPress={goBack} />
      </Header>

      <Calendar
        onDayPress={day => onDayPress(day.timestamp)}
        maxDate={convertToDateString(getTodayTime)}
      />
    </View>
  );
};

export default CalendarSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
