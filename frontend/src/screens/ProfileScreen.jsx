import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


import PageLayout from '../components/PageLayout';
import { menuItems } from '../constants/menuItems';
import { Color } from '../constants/TWPalette';
import { useAuth } from '../contexts/AuthContext';

//Deprecated
const ProfileScreen = () => {
    const navigation = useNavigation();
    const {logout} = useAuth();

    const handleLogoutPress = ()=>{
        Alert.alert(
            "Logout",
            "Are you sure to log out?",
            [
                {text: "Cancel", style: "cancel"},
                {text:"Logout", style:"destructive", onPress:()=>logout()}
            ]
        )
    }

    return (
        <PageLayout>
            <Text style={styles.header}>Hi, Guest!</Text>
            <View style={styles.menuSection}>
                {menuItems.map(item => (
                    <TouchableOpacity
                        key={item.label}
                        style={styles.menuCard}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <Icon name={item.icon} size={24} color={item.color} style={styles.menuIcon} />
                        <Text style={styles.menuText}>{item.label}</Text>
                        <Icon name="chevron-right" size={24} color="#bbb" style={styles.menuArrow} />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={handleLogoutPress}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafc', },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        color: Color.blue[900],
    },
    profileTop: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
        backgroundColor: '#fff',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        elevation: 2
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#eaeaea',
    },
    userName: {
        marginTop: 12,
        fontWeight: 'bold',
        fontSize: 22,
        color: '#23365d',
    },
    menuSection: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderRadius: 16,
        marginBottom: 14,
        elevation: 1,
        shadowColor: '#eaeaea',
    },
    menuIcon: { marginRight: 12 },
    menuText: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        color: '#23365d',
    },
    menuArrow: { marginLeft: 12 },
});

export default ProfileScreen;