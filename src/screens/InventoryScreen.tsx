import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { CATALOGUES, JEANS_SIZES, InventoryState } from '../types';

const InventoryScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [selectedCatalogue, setSelectedCatalogue] = useState<string>(CATALOGUES[0].id);
  const [inventory, setInventory] = useState<InventoryState>(() => {
    // Initialize inventory with 0 bundles for all catalogues and sizes
    const initial: InventoryState = {};
    CATALOGUES.forEach((cat) => {
      initial[cat.id] = {};
      JEANS_SIZES.forEach((size) => {
        initial[cat.id][size] = 0;
      });
    });
    return initial;
  });

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const updateBundles = useCallback((catalogueId: string, size: number, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setInventory((prev) => ({
      ...prev,
      [catalogueId]: {
        ...prev[catalogueId],
        [size]: Math.max(0, numValue),
      },
    }));
  }, []);

  const incrementBundles = useCallback((catalogueId: string, size: number) => {
    setInventory((prev) => ({
      ...prev,
      [catalogueId]: {
        ...prev[catalogueId],
        [size]: (prev[catalogueId]?.[size] || 0) + 1,
      },
    }));
  }, []);

  const decrementBundles = useCallback((catalogueId: string, size: number) => {
    setInventory((prev) => ({
      ...prev,
      [catalogueId]: {
        ...prev[catalogueId],
        [size]: Math.max(0, (prev[catalogueId]?.[size] || 0) - 1),
      },
    }));
  }, []);

  const getTotalBundlesForCatalogue = (catalogueId: string): number => {
    const catInventory = inventory[catalogueId];
    if (!catInventory) return 0;
    return Object.values(catInventory).reduce((sum, bundles) => sum + bundles, 0);
  };

  const getTotalBundles = (): number => {
    return Object.keys(inventory).reduce((total, catId) => {
      return total + getTotalBundlesForCatalogue(catId);
    }, 0);
  };

  const handleSave = () => {
    // In a real app, you would save to Firebase/backend here
    Alert.alert(
      'Inventory Saved',
      `Total bundles: ${getTotalBundles()}`,
      [{ text: 'OK' }]
    );
  };

  const selectedCatalogueData = CATALOGUES.find((c) => c.id === selectedCatalogue);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Inventory Manager</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Total Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Bundles</Text>
        <Text style={styles.summaryValue}>{getTotalBundles()}</Text>
      </View>

      {/* Catalogue Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {CATALOGUES.map((catalogue) => (
          <TouchableOpacity
            key={catalogue.id}
            style={[
              styles.tab,
              selectedCatalogue === catalogue.id && styles.tabActive,
            ]}
            onPress={() => setSelectedCatalogue(catalogue.id)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCatalogue === catalogue.id && styles.tabTextActive,
              ]}
            >
              {catalogue.name}
            </Text>
            <Text
              style={[
                styles.tabCount,
                selectedCatalogue === catalogue.id && styles.tabCountActive,
              ]}
            >
              {getTotalBundlesForCatalogue(catalogue.id)} bundles
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Catalogue Info */}
      <View style={styles.catalogueInfo}>
        <Text style={styles.catalogueName}>{selectedCatalogueData?.name}</Text>
        <Text style={styles.catalogueDesc}>{selectedCatalogueData?.description}</Text>
      </View>

      {/* Size Grid */}
      <ScrollView style={styles.gridContainer}>
        <View style={styles.grid}>
          {JEANS_SIZES.map((size) => (
            <View key={size} style={styles.sizeCard}>
              <Text style={styles.sizeLabel}>Size {size}</Text>
              <View style={styles.inputRow}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => decrementBundles(selectedCatalogue, size)}
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.bundleInput}
                  value={String(inventory[selectedCatalogue]?.[size] || 0)}
                  onChangeText={(value) => updateBundles(selectedCatalogue, size, value)}
                  keyboardType="numeric"
                  selectTextOnFocus
                />
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => incrementBundles(selectedCatalogue, size)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.bundleLabel}>bundles</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Inventory</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  signOutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  tabsContainer: {
    maxHeight: 80,
  },
  tabsContent: {
    paddingHorizontal: 12,
  },
  tab: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#1a73e8',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabCount: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  tabCountActive: {
    color: '#fff',
    opacity: 0.9,
  },
  catalogueInfo: {
    padding: 16,
    paddingBottom: 8,
  },
  catalogueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  catalogueDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  gridContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  sizeCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#e3f2fd',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  bundleInput: {
    width: 60,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  bundleLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default InventoryScreen;
