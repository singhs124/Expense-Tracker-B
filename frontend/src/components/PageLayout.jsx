import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Color } from '../constants/TWPalette';

import { ErrorToast } from '../components/ErrorToast';
import { useError } from '../contexts/ErrorContext';

const PageLayout = (props) => {
    const bgColors = [Color.blue[200], "rgba(255, 255, 255, 1)", Color.blue[100]];
    const {error,hideError} = useError();
  return (
    <LinearGradient style={{flex:1}} colors={bgColors}>
        <SafeAreaView style={{flex:1}}>
          {props.scrollEnabled?
            (<View style={[styles.scrollView, {flex:1}]}>{props.children}</View>) : (
              <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollView}>
                {props.children}
            </ScrollView>
            )
          }
        </SafeAreaView>
        {error && (
          <ErrorToast
          visible={error.visible}
          message={error.message}
          type={error.type}
          onDismiss={hideError}
          />
        )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    scrollView: {
    padding: 16,
    paddingBottom: 32,
  },
})

export default PageLayout