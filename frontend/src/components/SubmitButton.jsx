import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export const SubmitButton = ({onPress , loading ,title}) => {
    const buttonScale = useRef(new Animated.Value(1)).current;
    return (
        <Animated.View style={[styles.submitContainer, { transform: [{ scale: buttonScale }] }]}>
            <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonLoading]}
                onPress={onPress}
                disabled={loading}
            >
                <LinearGradient
                    colors={loading ? ['#9ca3af', '#6b7280'] : ['#6366f1', '#8b5cf6']}
                    style={styles.submitGradient}
                >
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <View style={styles.spinner} />
                            <Text style={styles.submitButtonText}>Adding...</Text>
                        </View>
                    ) : (
                        <>
                            <MaterialIcons name="add" size={24} color="white" />
                            <Text style={styles.submitButtonText}>{title}</Text>
                        </>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    submitContainer: {
    marginTop: 24,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderTopColor: 'transparent',
    marginRight: 8,
  },
})

