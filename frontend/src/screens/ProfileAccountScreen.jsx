import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Avatar from '../components/Avatar';
import { Color } from '../constants/TWPalette';


const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    const [profileData, setProfileData] = useState({
        name: 'Rahul Kumar',
        email: 'rahul.kumar@email.com',
        initials: 'RK',
    });

    const [stats] = useState({
        thisMonth: '₹45,230',
        transactions: 127,
        categories: 8,
    });

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [editName, setEditName] = useState(profileData.name);
    const [editEmail, setEditEmail] = useState(profileData.email);
    const [currency, setCurrency] = useState('INR');
    const [theme, setTheme] = useState('auto');

    const handleSaveProfile = () => {
        const initials = editName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        setProfileData({
            name: editName,
            email: editEmail,
            initials: initials,
        });

        setEditModalVisible(false);
        Alert.alert('Success', 'Profile updated successfully!');
    };

    const handleSaveSettings = () => {
        setSettingsModalVisible(false);
        Alert.alert('Success', 'Settings saved successfully!');
    };

    const handleMenuClick = (section) => {
        Alert.alert('Navigation', `Opening ${section}...`);
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: () => navigation.replace('Login') },
            ],
            { cancelable: true }
        );
    };


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

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={Color.blue[200]} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                {/* <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity
                        style={styles.settingsBtn}
                        onPress={() => setSettingsModalVisible(true)}
                        activeOpacity={0.7}>
                        <Icon name="settings" size={24} color={Color.gray[700]} />
                    </TouchableOpacity>
                </View> */}

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Avatar avatarUrl={require('../assets/avatar1.jpg')} initials={profileData.initials}/>
                        {/* <Image source={require('../assets/avatar1.jpg')} style={styles.avatar} /> */}
                        {/* <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{profileData.initials}</Text>
                        </View> */}
                        {/* <TouchableOpacity
                            style={styles.editAvatarBtn}
                            onPress={() => setEditModalVisible(true)}
                            activeOpacity={0.7}>
                            <Icon name="edit" size={18} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <View>
                        <Text style={styles.profileName}>{profileData.name}</Text>
                        <Text style={styles.profileEmail}>{profileData.email}</Text>
                    </View>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    {/* <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{profileData.initials}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.editAvatarBtn}
                                onPress={() => setEditModalVisible(true)}
                                activeOpacity={0.7}>
                                <Icon name="edit" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.profileName}>{profileData.name}</Text>
                        <Text style={styles.profileEmail}>{profileData.email}</Text>
                    </View> */}

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{stats.thisMonth}</Text>
                            <Text style={styles.statLabel}>This Month</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{stats.transactions}</Text>
                            <Text style={styles.statLabel}>Transactions</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{stats.categories}</Text>
                            <Text style={styles.statLabel}>Categories</Text>
                        </View>
                    </View>
                </View>

                {/* Account Settings */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>Account Settings</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="user"
                            title="Personal Information"
                            subtitle="Update your details"
                            color="rgba(14, 165, 233, 0.1)"
                            onPress={() => handleMenuClick('Personal Info')}
                        />
                        <MenuItem
                            icon="lock"
                            title="Security & Privacy"
                            subtitle="Password, 2FA, biometric"
                            color="rgba(16, 185, 129, 0.1)"
                            onPress={() => handleMenuClick('Security')}
                        />
                        <MenuItem
                            icon="bell"
                            title="Notifications"
                            subtitle="Manage alerts & reminders"
                            color="rgba(139, 92, 246, 0.1)"
                            onPress={() => handleMenuClick('Notifications')}
                        />
                    </View>
                </View>

                {/* App Settings */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>App Settings</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="dollar-sign"
                            title="Budget & Goals"
                            subtitle="Set spending limits"
                            color="rgba(249, 115, 22, 0.1)"
                            onPress={() => handleMenuClick('Budget')}
                        />
                        <MenuItem
                            icon="grid"
                            title="Categories"
                            subtitle="Customize expense tags"
                            color="rgba(236, 72, 153, 0.1)"
                            onPress={() => handleMenuClick('Categories')}
                        />
                        <MenuItem
                            icon="download"
                            title="Export Data"
                            subtitle="Download CSV, PDF reports"
                            color="rgba(14, 165, 233, 0.1)"
                            onPress={() => handleMenuClick('Export')}
                        />
                    </View>
                </View>

                {/* Support */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuTitle}>Support & About</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="help-circle"
                            title="Help Center"
                            subtitle="FAQs & tutorials"
                            color="rgba(16, 185, 129, 0.1)"
                            onPress={() => handleMenuClick('Help')}
                        />
                        <MenuItem
                            icon="info"
                            title="About Exp3nse"
                            subtitle="Version 2.0.1"
                            color="rgba(139, 92, 246, 0.1)"
                            onPress={() => handleMenuClick('About')}
                        />
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleLogout}
                    activeOpacity={0.8}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 24 }} />
            </ScrollView>

            {/* Edit Profile Modal */}
            <Modal
                visible={editModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Edit Profile</Text>
                        <Text style={styles.modalText}>Update your profile information</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Full Name</Text>
                            <TextInput
                                style={styles.formInput}
                                value={editName}
                                onChangeText={setEditName}
                                placeholder="Enter your name"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Email Address</Text>
                            <TextInput
                                style={styles.formInput}
                                value={editEmail}
                                onChangeText={setEditEmail}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.btn, styles.btnSecondary]}
                                onPress={() => setEditModalVisible(false)}
                                activeOpacity={0.7}>
                                <Text style={styles.btnSecondaryText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, styles.btnPrimary]}
                                onPress={handleSaveProfile}
                                activeOpacity={0.7}>
                                <Text style={styles.btnPrimaryText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Settings Modal */}
            <Modal
                visible={settingsModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSettingsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>App Settings</Text>
                        <Text style={styles.modalText}>Customize your experience</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Currency</Text>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.pickerText}>
                                    {currency === 'INR' ? '₹ Indian Rupee (INR)' : currency}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Theme</Text>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.pickerText}>
                                    {theme === 'auto' ? 'Auto (System)' : theme}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.btn, styles.btnSecondary]}
                                onPress={() => setSettingsModalVisible(false)}
                                activeOpacity={0.7}>
                                <Text style={styles.btnSecondaryText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, styles.btnPrimary]}
                                onPress={handleSaveSettings}
                                activeOpacity={0.7}>
                                <Text style={styles.btnPrimaryText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.blue[200],
        paddingTop: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.gray[900],
    },
    settingsBtn: {
        backgroundColor: Color.white,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    profileCard: {
        backgroundColor: Color.white,
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },
    profileHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        gap: 20,
        marginBottom: 24,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: Color.blue[500],
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
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Color.blue[500],
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Color.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.gray[900],
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: Color.gray[500],
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: Color.blue[50],
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.gray[100],
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.blue[600],
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: Color.gray[600],
    },
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
    logoutBtn: {
        backgroundColor: '#ef4444',
        marginHorizontal: 16,
        marginTop: 8,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    logoutBtnText: {
        color: Color.white,
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: Color.white,
        borderRadius: 24,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.gray[900],
        marginBottom: 8,
    },
    modalText: {
        fontSize: 14,
        color: Color.gray[600],
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.gray[700],
        marginBottom: 8,
    },
    formInput: {
        width: '100%',
        padding: 12,
        borderWidth: 2,
        borderColor: Color.gray[200],
        borderRadius: 12,
        fontSize: 15,
        color: Color.gray[900],
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: Color.gray[200],
        borderRadius: 12,
        padding: 12,
    },
    pickerText: {
        fontSize: 15,
        color: Color.gray[700],
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
    },
    btn: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnPrimary: {
        backgroundColor: Color.blue[500],
    },
    btnPrimaryText: {
        color: Color.white,
        fontSize: 15,
        fontWeight: '600',
    },
    btnSecondary: {
        backgroundColor: Color.gray[100],
    },
    btnSecondaryText: {
        color: Color.gray[700],
        fontSize: 15,
        fontWeight: '600',
    },
})

export default ProfileScreen;