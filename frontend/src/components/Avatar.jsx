import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Color } from '../constants/TWPalette';

const Avatar = ({ avatarUrl, initials }) => {
  const [imageError, setImageError] = useState(false);

  if (avatarUrl && !imageError) {
    return (
      <Image
        source={avatarUrl}
        style={styles.avatar}
        onError={() => setImageError(true)}
      />
    );
  } else {
    return (
      <View style={[styles.avatar]}>
        {initials ? (
          <Text style={styles.avatarText}>{initials}</Text>
        ) : (
          <Icon name="person" size={40} color="#fff" />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: Color.blue[500],
        alignItems: 'center',       // center inner content horizontally
        justifyContent: 'center', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 7,
    },
    avatarText: {
        fontSize: 40,
        color: Color.white,
        fontWeight: '700',
    },
})

export default Avatar;
