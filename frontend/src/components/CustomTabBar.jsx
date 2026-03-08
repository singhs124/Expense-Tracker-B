import { default as React } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Color } from '../constants/TWPalette';
import { getTabIcon } from '../utils/navigationHelper';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  let settingsKey;
  state.routes.map((route,index)=>{
    if(route.name === 'Settings') settingsKey = route.key
  })
  const {options} = descriptors[settingsKey];
  const tabBarStyle = options.tabBarStyle;
  if(tabBarStyle && tabBarStyle.display === 'none'){
    return null;
  }
  else return (
    <View style={styles.tabBarContainer}>
      {/* Background Blur Effect */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
        style={styles.tabBarBackground}
      />
      
      {/* Tab Items */}
      <View style={styles.tabBarContent}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined 
            ? options.tabBarLabel 
            : options.title !== undefined 
            ? options.title 
            : route.name;

          const tabBarStyle = options.tabBarStyle;

          const isFocused = state.index === index;
          const isAddExpense = route.name === 'Add Expense';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Render Add Expense as Floating Action Button
          if (isAddExpense) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.fabContainer}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[Color.blue[200], "rgba(255, 255, 255, 1)", Color.blue[100]]}
                  style={styles.fab}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="add" size={28} color={Color.blue[600]} />
                </LinearGradient>
                {/* <Text style={styles.fabLabel}>Add</Text> */}
              </TouchableOpacity>
            );
          }

          // Regular Tab Item
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.tabItemActive]}
              activeOpacity={0.7}
            >
              <Animated.View style={[styles.tabIconContainer, isFocused && styles.tabIconActive]}>
                <Icon 
                  name={getTabIcon(route.name)} 
                  size={24} 
                  color={isFocused ? Color.blue[600] : '#9ca3af'} 
                />
                {/* {isFocused && <View style={styles.activeIndicator} />} */}
              </Animated.View>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Tab Bar Container
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    paddingBottom: 10,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBarContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  // Regular Tab Items
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  tabItemActive: {
    // backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 35,
    borderRadius: 20,
    marginBottom: 1,
    position: 'relative',
  },
  tabIconActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    transform: [{ scale: 1.1 }],
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Color.blue[200],
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: '#9ca3af',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: Color.blue[500],
    fontWeight: '700',
  },

  // Floating Action Button (Add Expense)
  fabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -15,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    marginTop: 4,
  },
});

export default CustomTabBar;
