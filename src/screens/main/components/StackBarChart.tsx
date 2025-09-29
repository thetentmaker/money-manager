
import { StackedBarChart } from 'react-native-chart-kit';
import { View } from 'react-native';

interface StackBarChartProps {
  labels: string[];
  legend: string[];
  data: number[][];
  barColors: string[];
  width: number;
  height: number;
}
const StackBarChart = ({
  labels,
  legend,
  data,
  barColors,
  width,
  height,
}: StackBarChartProps) => {
  return (
    <View>
      <StackedBarChart
        data={{
          labels,
          legend,
          data,
          barColors,
        }}
        hideLegend={true}
        width={width}
        height={height}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: 'gray',
          color: (opacity: number = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
};

export default StackBarChart;
