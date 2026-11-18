
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Menu item information
type MenuItem = {
  id: number;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

// Check if the input is empty
function isEmpty(value: string) {
  return value.trim().length === 0;
}

// Display the menu items
function MenuItemsList({
  items,
  onEdit,
  deleteId,
  setDeleteId,
  onDelete
}: {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  deleteId: number;
  setDeleteId: (id: number) => void;
  onDelete: (id: number) => void;
}) {

  const arrOutput: ReactNode[] = [];

  for (let i = 0; i < items.length; i++) {

    const item = items[i];

    arrOutput.push(
      <View key={item.id} style={styles.menuCard}>

        <View style={styles.itemHeader}>

          <Text style={styles.dishTitle}>
            {item.dishName}
          </Text>

          <Text style={styles.priceText}>
            R{item.price.toFixed(2)}
          </Text>

        </View>

        <Text style={styles.descriptionText}>
          {item.description}
        </Text>

        <Text style={styles.courseLabel}>
          {item.course}
        </Text>

