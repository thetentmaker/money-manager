import { View, StyleSheet } from 'react-native';
import Header from '../../designsystem/Header';
import useMonthly from './useMonthly';
import StackBarChart from '../main/components/StackBarChart';

const MonthlyScreen = () => {
  const {
    chartLabels,
    chartLegend,
    chartData,
    chartBarColors,
    chartSize,
    onPressClose,
  } = useMonthly();
  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>Monthly screen</Header.Title>
        <Header.Icon name="close" onPress={onPressClose} />
      </Header>

      <View style={styles.content}>
        <StackBarChart
          labels={chartLabels}
          legend={chartLegend}
          data={chartData}
          barColors={chartBarColors}
          width={chartSize.width}
          height={chartSize.height}
        />
      </View>
    </View>
  );
};

export default MonthlyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
