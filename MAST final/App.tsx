
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

        {/* Edit and delete buttons */}
        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(item)}
          >
            <Text style={styles.buttonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteId(item.id)}
          >
            <Text style={styles.buttonText}>
              Delete
            </Text>
          </TouchableOpacity>

        </View>

        {/* Confirm before deleting */}
        {deleteId === item.id && (
          <View style={styles.confirmBox}>

            <Text style={styles.confirmText}>
              Are you sure you want to delete this dish?
            </Text>

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(item.id)}
              >
                <Text style={styles.buttonText}>
                  Yes, Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteId(-1)}
              >
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        )}

      </View>
    );
  }

  return (
    <View>
      {arrOutput}
    </View>
  );
}

// Main application
export default function App() {

  // Store menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Input fields
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  // Edit and delete
  const [editId, setEditId] = useState(-1);
  const [nextId, setNextId] = useState(1);
  const [deleteId, setDeleteId] = useState(-1);

  // Search and filter
  const [searchText, setSearchText] = useState('');
  const [selectedValue, setSelectedValue] = useState('All Courses');

  // Messages
  const [Error, setError] = useState('');
  const [Success, setSuccess] = useState('');

  // Clear all form fields
  function clearForm() {
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setEditId(-1);
    setError('');
  }

