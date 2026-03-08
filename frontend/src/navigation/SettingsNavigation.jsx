import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BankScreen from '../screens/BankScreen';
import ComingSoonPage from '../screens/ComingSoonPage';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createNativeStackNavigator();

export const SettingScreenStack = ()=> {
  return (
    <ProfileStack.Navigator screenOptions={({route})=>{
      return {
      headerShown: route.name !== 'Menus'
    }}}>
      <ProfileStack.Screen name="Menus" component={ProfileScreen} />
      <ProfileStack.Screen name="Theme" component={ComingSoonPage} />
      <ProfileStack.Screen name="Bank" component={BankScreen} />
      <ProfileStack.Screen name="Preferences" component={ComingSoonPage} />
    </ProfileStack.Navigator>
  )
}