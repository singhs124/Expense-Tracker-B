import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Color = {
  blue: { '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe' },
  red: { '500': '#ef4444', '100': '#fee2e2' },
  yellow: { '500': '#eab308', '100': '#fef9c3' },
  green: { '500': '#22c55e', '100': '#dcfce7' }
};

export const ErrorToast = ({ visible, message, type = 'error', onDismiss }) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8
      }).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 250,
      useNativeDriver: true
    }).start(() => onDismiss && onDismiss());
  };

  const config = {
    error: { icon: '✕', color: Color.red['500'], bg: Color.red['100'] },
    warning: { icon: '⚠', color: Color.yellow['500'], bg: Color.yellow['100'] },
    success: { icon: '✓', color: Color.green['500'], bg: Color.green['100'] },
    info: { icon: 'ℹ', color: Color.blue['200'], bg: Color.blue['100'] }
  };

  const currentConfig = config[type] || config.error;

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.toastContainer,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={[styles.toast, { borderLeftColor: currentConfig.color }]}>
        <View style={[styles.iconContainer, { backgroundColor: currentConfig.bg }]}>
          <Text style={[styles.icon, { color: currentConfig.color }]}>
            {currentConfig.icon}
          </Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#6b7280',
  },
});