import {
    StyleSheet, Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Color } from '../constants/TWPalette';

const MenuItem = ({ icon, title, subtitle, color, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.menuIcon, { backgroundColor: color }]}>
                <Icon name={icon} size={22} color={color.replace('0.1', '1')} />
            </View>
            <View style={styles.menuContent}>
                <Text style={styles.menuItemTitle}>{title}</Text>
                <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={Color.gray[400]} />
        </TouchableOpacity>
    );


const styles = StyleSheet.create({
        menuSection: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.gray[700],
        marginBottom: 12,
        paddingLeft: 8,
    },
    menuCard: {
        backgroundColor: Color.white,
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        borderBottomWidth: 1,
        borderBottomColor: Color.gray[100],
    },
    menuIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    menuContent: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.gray[900],
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontSize: 13,
        color: Color.gray[500],
    },
})    


export default MenuItem;