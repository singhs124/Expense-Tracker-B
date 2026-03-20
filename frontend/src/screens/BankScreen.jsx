import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ModalComp } from '../components/ModalComp';
import PageLayout from '../components/PageLayout';
import { bankIcons } from '../constants/bankIcons';
import { BankContext } from '../contexts/BankContext';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { log } from '../utils/logging';

const BankScreen = () => {
  const { originWiseExpense } = useContext(ExpenseContext);
  const { addNewBank, getBanksList, deleteBank, updateBank } = useContext(BankContext);
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState('');

  const [selectedBank, setSelectedBank] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showEditBankModal, setShowEditBankModal] = useState(false);
  const [, setNewBankName] = useState('');
  const [loading, setLoading] = useState(false);
  const successAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    populateBanks();
  }, []);

  const populateBanks = async () => {
    try {
      setLoading(true);
      const data = await getBanksList();
      const bankList = data.map(d => ({ id: d.id, name: d.name }))
      console.log(bankList);
      setBanks(bankList);
    } catch (error) {
      setBanks([]);
    } finally {
      setLoading(false);
    }
  }

  const assignedIcons = useMemo(() => {
    return banks.reduce((acc, bank, idx) => {
      acc[bank.name] = bankIcons[idx % bankIcons.length];
      return acc;
    }, {});
  }, [banks])

  // Handle bank card tap
  const handleBankPress = (bank) => {
    setSelectedBank(bank);
    setShowActionSheet(true);
  };

  // Add new bank
  const handleAddBank = async (name) => {
    if (name.trim()) {
      const newBank = {
        bankName: name.trim()
      };
      try {
        const success = await addNewBank(newBank);
        log.info("Calling Add New Bank API from BankScreen.jsx");
        if (success) {
          Animated.timing(successAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();

          // Reset form after success
          setTimeout(() => {
            setNewBankName('');
            successAnimation.setValue(0);
          }, 1500);
          populateBanks();
          Vibration.vibrate([100, 100, 100]);
        }
        setShowAddBankModal(false);
      } catch (error) {
        setError(error.message || String(error))
        console.error(error);
        log.warn("Error Occurred During Adding Bank: " + error);
      }
    }
  };
  // Delete bank
  const handleDeleteBank = async () => {
    try {
      console.log(selectedBank.id);
      const success = await deleteBank(selectedBank.id);
      if (success) {
        Animated.timing(successAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Reset form after success
        setTimeout(() => {
          successAnimation.setValue(0);
        }, 1500);
        Vibration.vibrate([100, 100, 100]);
        populateBanks();
        await originWiseExpense();
      }
      setShowActionSheet(false);
      setSelectedBank(null);
    } catch (error) {
      console.error(error);
      log.error("Error Occurred During Deleting Bank: " + error);
    }

    // setBanks(banks.filter((b) => b.id !== selectedBank.id));

  };

  const editBank = async (name) => {
    if (!name.trim()) return;
    try {
      const updatedBank = { bankName: name.trim() };
      const success = await updateBank(selectedBank.id, updatedBank);
      if (success) {
        Animated.timing(successAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Reset form after success
        setTimeout(() => {
          setNewBankName('');
          successAnimation.setValue(0);
        }, 1500);
        Vibration.vibrate([100, 100, 100]);
        populateBanks();
        await originWiseExpense();
      }
      setShowEditBankModal(false);
    } catch (error) {
      console.error(error);
      log.error("[EditBank] --- " + error);
    }
  }
  // Edit bank (navigate to edit screen or show edit modal)
  const handleEditBank = async () => {
    setShowActionSheet(false);
    setShowEditBankModal(true);
    //handling editing
    // Add your edit logic here
    console.log('Edit bank:', selectedBank);
  };

  const renderBankCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.bankCard, { backgroundColor: "#000", flex: 1, margin: 8 }]}
      activeOpacity={0.8}
      onPress={() => handleBankPress(item)}
    >
      <Icon name={assignedIcons[item.name]} size={15} color="#fff" />
      <Text style={styles.bankName} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
    </TouchableOpacity>
  )


  const RenderAddButton = () => (
    <TouchableOpacity
      style={[styles.bankCard, styles.addBankCard]}
      onPress={() => { setError(''), setShowAddBankModal(true) }}
    >
      <Icon name="add" size={25} color="#6366f1" />
      <Text style={styles.addBankText}>Add Bank</Text>
    </TouchableOpacity>
  )
  return (
    <PageLayout scrollEnabled={true}>
      <View style={styles.container}>
        {/* Header */}
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Bank Settings</Text>
          <Text style={styles.headerSubtitle}>
            Manage your bank accounts
          </Text>
        </View> */}

        {/* Bank List */}
        <RenderAddButton />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : 
          <FlatList
            data={banks}
            renderItem={renderBankCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        }

        {/* Bottom Action Sheet */}
        <Modal
          visible={showActionSheet}
          transparent
          animationType="fade"
          onRequestClose={() => setShowActionSheet(false)}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setShowActionSheet(false)}
          >
            <View style={styles.actionSheet}>
              <View style={styles.actionSheetHandle} />

              <Text style={styles.actionSheetTitle}>
                {selectedBank?.name}
              </Text>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleEditBank}
              >
                <Icon name="edit" size={24} color="#6366f1" />
                <Text style={styles.actionButtonText}>Update Bank</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={handleDeleteBank}
              >
                <Icon name="delete-outline" size={24} color="#ef4444" />
                <Text style={[styles.actionButtonText, styles.deleteText]}>
                  Delete Bank
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowActionSheet(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Add Bank Modal */}
        <ModalComp visible={showAddBankModal} title="Add Bank" buttonTitle="Add Bank" onSubmit={handleAddBank} error={error} onCancel={() => { setShowAddBankModal(false), setError('') }} />
        <ModalComp visible={showEditBankModal} initialValue={selectedBank?.name} title="Update Bank" buttonTitle="Update" onSubmit={editBank} onCancel={() => setShowEditBankModal(false)} />
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 1,
    paddingBottom: 24
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

export default BankScreen;
