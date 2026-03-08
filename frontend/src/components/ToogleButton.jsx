import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Vibration } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';


const ToogleButton = ({isFixed,setIsFixed, loading,label,subText,icon}) => {
    return (
        <View style={styles.toggleContainer}>
            <View style={styles.toggleContent}>
                <MaterialIcons name={icon} size={24} color="#6366f1" />
                <View style={styles.toggleTextContainer}>
                    <Text style={styles.toggleLabel}>{label}</Text>
                    <Text style={styles.toggleSubtext}>{subText}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.toggle, isFixed && styles.toggleActive]}
                onPress={() => {
                    setIsFixed(!isFixed);
                    Vibration.vibrate(50);
                }}
                disabled={loading}
            >
                <View style={[styles.toggleThumb, isFixed && styles.toggleThumbActive]} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
// Toggle Styles
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginBottom: 8,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleTextContainer: {
    marginLeft: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  toggleSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#6366f1',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  }
})

export default ToogleButton