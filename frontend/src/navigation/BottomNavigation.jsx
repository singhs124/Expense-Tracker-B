import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import CustomTabBar from '../components/CustomTabBar';
import AddExpense from '../screens/AddExpense';
import ComingSoonPage from '../screens/ComingSoonPage';
import HomeScreen from '../screens/HomeScreen';
import { SettingScreenStack } from './SettingsNavigation';

const Tab = createBottomTabNavigator();

export const MainTabs = ()=> {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={ComingSoonPage}
        options={{
          tabBarLabel: 'Statistics',
        }}
      />

      <Tab.Screen
        name="Add Expense"
        component={AddExpense}
        options={{
          tabBarLabel: 'Add Expense',
        }}
      />
      {/* Do not change tab names, if required, change in CustomTabNar.jsx as well */}
      <Tab.Screen
        name="Settings"
        component={SettingScreenStack}
        options={({route})=>{
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Menus';
          return{
            tabBarLabel:"Settings",
            tabBarStyle: routeName === 'Menus' ? {} : {display: 'none'}
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ComingSoonPage}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}