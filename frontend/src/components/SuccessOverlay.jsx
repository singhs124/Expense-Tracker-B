import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SuccessOverlay = ({ animationValue, message }) => {

  return (
    <Animated.View
      style={[
        styles.successOverlay,
        {
          opacity: animationValue,
          transform: [{
            scale: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
          }],
        },
      ]}
      pointerEvents="none"
    >
      <MaterialIcons name="check-circle" size={80} color="#10b981" />
      <Text style={styles.successText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successText: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '600',
    color: '#10b981',
  }
});

export default SuccessOverlay;
