import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text, StyleSheet } from "react-native";


import { Color } from "../constants/TWPalette";
import OriginCategory from './OriginCategory';
import PageLayout from '../components/PageLayout';

const HomeScreen = () => {
    const [loading, setLoading] = useState(false);

    return (
        <PageLayout>
            <Text style={styles.header}>Dashboard 🏆</Text>
            {loading ? (
                <ActivityIndicator size="large" color={Color.blue[700]} />
            ) : (
                <>
                    <OriginCategory />
                </>
            )}
        </PageLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        color: Color.blue[900],
    },
});

export default HomeScreen;
