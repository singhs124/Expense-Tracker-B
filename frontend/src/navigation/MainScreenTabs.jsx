import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import CustomTabBar from '../components/CustomTabBar';
import AddExpense from '../screens/AddExpense';
import HomeScreen from '../screens/HomeScreen';
import { AccountStack } from './SettingsNavigation';

const Tab = createBottomTabNavigator();

const BOTTOM_TABS = [
  {
    name: 'Home',
    component: HomeScreen,
    options: { tabBarLabel: 'Home' },
  },
  // {
  //   name: 'Statistics',
  //   component: ComingSoonPage,
  //   options: { tabBarLabel: 'Statistics' },
  // },
  {
    name: 'Add Expense',
    component: AddExpense,
    options: { tabBarLabel: 'Add Expense' },
  },
  {
    // Do not change tab names, if required, change in CustomTabNar.jsx as well
    name: 'Profile',
    component: AccountStack,
    options: ({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'Menus';
      return {
        tabBarLabel: 'Profile',
        tabBarStyle: routeName === 'Menus' ? {} : { display: 'none' },
      };
    },
  },
  // {
  //   name: 'Profile',
  //   component: AccountScreen,
  //   options: { tabBarLabel: 'Profile' },
  // },
];

export const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {BOTTOM_TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};