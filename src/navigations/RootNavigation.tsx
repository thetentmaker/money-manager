import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import DetailScreen from '../screens/DetailScreen';
import MonthlyScreen from '../screens/MonthlyScreen';
import AddUpdateScreen from '../screens/AddUpdateScreen';
import AccountBookHistory from '../data/AccountBookHistory';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: { item: AccountBookHistory };
  Detail: { item: AccountBookHistory };
  MonthlyAverage: undefined;
};

const Stack = createNativeStackNavigator<ScreenParams>();

const RootNavigation = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    presentation: 'containedModal',
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddUpdateScreen} />
      <Stack.Screen name="Update" component={AddUpdateScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="MonthlyAverage" component={MonthlyScreen} />
    </Stack.Navigator>
  );
};

const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();


export default RootNavigation;
export { useRootNavigation, useRootRoute };
export type { ScreenParams };
