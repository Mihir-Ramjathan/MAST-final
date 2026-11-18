
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

