
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

  // Open the add dish page
  function addMenuItem(navigation: any) {
    clearForm();
    setSuccess('');
    setDeleteId(-1);
    navigation.navigate('ViewDetails');
  }

  // Open the edit dish page
  function editMenuItem(item: MenuItem, navigation: any) {

    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(String(item.price));
    setEditId(item.id);
    setError('');
    setSuccess('');
    setDeleteId(-1);

    navigation.navigate('ViewDetails');
  }

  // Add or update a menu item
  function saveMenuItem() {

    // Check for empty fields
    if (
      isEmpty(dishName) ||
      isEmpty(description) ||
      isEmpty(course) ||
      isEmpty(price)
    ) {
      setError('Please fill in all the fields.');
      return false;
    }

    // Check the price
    if (
      isNaN(Number(price)) ||
      !isFinite(Number(price)) ||
      Number(price) <= 0
    ) {
      setError('Please enter a valid price greater than R0.');
      return false;
    }

    // Check if the same dish already exists
    const alreadyExist = menuItems.some(
      (item) =>
        item.dishName.toLowerCase() ===
          dishName.trim().toLowerCase() &&
        item.course === course &&
        item.id !== editId
    );

    if (alreadyExist) {
      setError('This dish already exists in this course.');
      return false;
    }

    // Add a new menu item
    if (editId === -1) {

      const newItem: MenuItem = {
        id: nextId,
        dishName: dishName.trim(),
        description: description.trim(),
        course: course,
        price: Number(price)
      };

      setMenuItems((currentItems) => [...currentItems, newItem]);

      setNextId(nextId + 1);

      setSuccess('Menu item added successfully.');

    } else {

      // Update an existing menu item
      const updatedItems: MenuItem[] = [];

      for (let i = 0; i < menuItems.length; i++) {

        if (menuItems[i].id === editId) {

          updatedItems.push({
            id: menuItems[i].id,
            dishName: dishName.trim(),
            description: description.trim(),
            course: course,
            price: Number(price)
          });

        } else {
          updatedItems.push(menuItems[i]);
        }
      }

      setMenuItems(updatedItems);

      setSuccess('Menu item updated successfully.');
    }

    clearForm();
    return true;
  }

  // Remove a menu item
  function removeMenuItemHandler(id: number) {

    setMenuItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );

    setDeleteId(-1);

    setSuccess('Menu item deleted successfully.');
  }

  // Navigation between pages
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <StatusBar style="light" />

        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#111111'
            },
            headerTintColor: '#D4AF37',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerShadowVisible: false
          }}
        >

          {/* Page 1 - Main menu */}
          <Stack.Screen
            name="MainScreen"
            options={{
              title: "Chef's Menu Manager"
            }}
          >
            {({ navigation }) => (
              <MainScreen
                navigation={navigation}
                menuItems={menuItems}
                Success={Success}
                onAdd={() => addMenuItem(navigation)}
                onEdit={(item: MenuItem) =>
                  editMenuItem(item, navigation)
                }
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                onDelete={removeMenuItemHandler}
              />
            )}
          </Stack.Screen>

          {/* Page 2 - Add and edit dishes */}
          <Stack.Screen
            name="ViewDetails"
            options={{
              title: 'Manage Dish'
            }}
          >
            {({ navigation }) => (
              <ViewDetails
                navigation={navigation}
                dishName={dishName}
                setDishName={setDishName}
                description={description}
                setDescription={setDescription}
                course={course}
                setCourse={setCourse}
                price={price}
                setPrice={setPrice}
                editId={editId}
                Error={Error}
                onSave={saveMenuItem}
                clearForm={clearForm}
              />
            )}
          </Stack.Screen>

          {/* Page 3 - Search and filter */}
          <Stack.Screen
            name="ListSkills"
            options={{
              title: 'Search and Filter'
            }}
          >
            {({ navigation }) => (
              <ListSkills
                navigation={navigation}
                menuItems={menuItems}
                searchText={searchText}
                setSearchText={setSearchText}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                Success={Success}
                onEdit={(item: MenuItem) =>
                  editMenuItem(item, navigation)
                }
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                onDelete={removeMenuItemHandler}
              />
            )}
          </Stack.Screen>

          {/* Page 4 - Menu statistics */}
          <Stack.Screen
            name="StatisticsScreen"
            options={{
              title: 'Menu Statistics'
            }}
          >
            {({ navigation }) => (
              <StatisticsScreen
                navigation={navigation}
                menuItems={menuItems}
              />
            )}
          </Stack.Screen>

        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// PAGE 1: Main menu
function MainScreen({
  navigation,
  menuItems,
  Success,
  onAdd,
  onEdit,
  deleteId,
  setDeleteId,
  onDelete
}: any) {

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Main app logo */}
        <Image
          source={require('./Images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Home banner */}
        <Image
          source={require('./Images/home-banner.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Welcome message */}
        <View style={styles.heroSection}>

          <Text style={styles.WelcomeTitle}>
            Welcome, Chef!
          </Text>

          <Text style={styles.welcomeSubtitle}>
            Your restaurant menu in one place
          </Text>

        </View>

        {/* Menu overview */}
        <View style={styles.infoCard}>

          <Text style={styles.infoTitle}>
            Menu Overview
          </Text>

          <Text style={styles.infoText}>
            Total menu items
          </Text>

          <Text style={styles.counterText}>
            {menuItems.length}
          </Text>

        </View>

        {/* Menu navigation */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Menu Management
          </Text>

          <Text style={styles.sectionSubtitle}>
            Choose what you would like to do
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onAdd}
          >
            <Text style={styles.primaryButtonText}>
              + Add Menu Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('ListSkills')}
          >
            <Text style={styles.secondaryButtonText}>
              Search and Filter Menu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('StatisticsScreen')}
          >
            <Text style={styles.secondaryButtonText}>
              View Menu Statistics
            </Text>
          </TouchableOpacity>

        </View>

        {/* Success message */}
        {Success !== '' && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              {Success}
            </Text>
          </View>
        )}

        {/* Display current menu */}
        <Text style={styles.sectionTitle}>
          Current Menu
        </Text>

        {menuItems.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyText}>
              No menu items have been added yet.
            </Text>

            <Text style={styles.sectionSubtitle}>
              Select Add Menu Item to create your first dish.
            </Text>

          </View>

        ) : (

          <MenuItemsList
            items={menuItems}
            onEdit={onEdit}
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            onDelete={onDelete}
          />

        )}

      </ScrollView>

    </SafeAreaView>
  );
}

