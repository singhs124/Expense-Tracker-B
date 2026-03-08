import { useEffect, useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import errorStyles from '../css/errorMessage';

export const ModalComp = ({visible, initialValue='', title, buttonTitle, onSubmit, onCancel, error}) => {
    const [bankName, setBankName] = useState(initialValue);

    useEffect(()=>{
        setBankName(initialValue);
    },[initialValue,visible]);

    const handleSubmit = ()=>{
        onSubmit(bankName);
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <Pressable
                style={styles.modalBackdrop}
                onPress={onCancel}
            >
                <View style={styles.addBankModal}>
                    <Text style={styles.modalTitle}>{title}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Bank Name"
                        value={bankName}
                        onChangeText={setBankName}
                        autoFocus
                    />
                    {error && <Text style={errorStyles.errorText}>{error}</Text>}

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelModalButton]}
                            onPress={() => {
                                setBankName('');
                                onCancel()
                            }}
                        >
                            <Text style={styles.cancelModalButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.addButton]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.addButtonText}>{buttonTitle}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    listContainer: {
        paddingBottom: 100,
    },
    bankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bankName: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 16,
    },
    addBankCard: {
        backgroundColor: '#f3f4f6',
        borderWidth: 2,
        padding: 15,
        borderColor: '#6366f1',
        borderStyle: 'dashed'
    },
    addBankText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#6366f1',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    actionSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    actionSheetHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    actionSheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        marginBottom: 12,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6366f1',
        marginLeft: 12,
    },
    deleteButton: {
        backgroundColor: '#fee2e2',
    },
    deleteText: {
        color: '#ef4444',
    },
    cancelButton: {
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#6b7280',
    },
    addBankModal: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 20,
        padding: 24,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#f9fafb',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelModalButton: {
        backgroundColor: '#f3f4f6',
    },
    cancelModalButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
    },
    addButton: {
        backgroundColor: '#6366f1',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

