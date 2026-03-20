import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BankScreen from '../screens/BankScreen';
import ComingSoonPage from '../screens/ComingSoonPage';
import AccountScreen from '../screens/ProfileAccountScreen';

const Stack = createNativeStackNavigator();

const SCREENS = [
  { name: 'Menus', component: AccountScreen },
  { name: 'Theme', component: ComingSoonPage },
  { name: 'Bank', component: BankScreen },
  { name: 'Preferences', component: ComingSoonPage },
];

export const AccountStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'Menus'
      })}
    >
      {SCREENS.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};
