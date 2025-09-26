import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainScreen from '../screens/main/MainScreen';
import DetailScreen from '../screens/detail/DetailScreen';
import MonthlyScreen from '../screens/monthly/MonthlyScreen';
import AddUpdateScreen from '../screens/addUpdate/AddUpdateScreen';
import AccountBookHistory from '../data/AccountBookHistory';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CalendarSelectScreen from '../screens/calendarSelect/CalendarSelectScreen';
import TakePhotoScreen from '../screens/takePhoto/TakePhotoScreen';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: { item: AccountBookHistory };
  Detail: { item: AccountBookHistory };
  MonthlyAverage: undefined;
  CalendarSelect: { onSelectDay: (date: number) => void };
  TakePhoto: { onTakePhoto: (photoUrl: string) => void };
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
      <Stack.Screen name="CalendarSelect" component={CalendarSelectScreen} />
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
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
