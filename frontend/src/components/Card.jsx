import React from 'react'
import { View, Text, StyleSheet } from "react-native";

import {Color} from '../constants/TWPalette'
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Card = ({ title, children }) => (
    <View style={styles.card}>
        {title && <Text style={styles.cardTitle}>{title}</Text>}
        <View style={styles.cardContent}>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        // subtle shadow for iOS & Android
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
    textAlign: "center",
  },
  cardContent: {
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
  },
});

export default Card