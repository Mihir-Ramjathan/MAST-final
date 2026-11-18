
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

// PAGE 2: Add and edit dishes
function ViewDetails({
  navigation,
  dishName,
  setDishName,
  description,
  setDescription,
  course,
  setCourse,
  price,
  setPrice,
  editId,
  Error,
  onSave,
  clearForm
}: any) {

  const courses = ['Starter', 'Main Course', 'Dessert'];

  const courseButtons: ReactNode[] = [];

  // Display course options
  for (let i = 0; i < courses.length; i++) {

    courseButtons.push(
      <TouchableOpacity
        key={courses[i]}
        style={[
          styles.courseButton,
          course === courses[i] &&
            styles.selectedCourseButton
        ]}
        onPress={() => setCourse(courses[i])}
      >
        <Text
          style={[
            styles.courseButtonText,
            course === courses[i] &&
              styles.selectedCourseButtonText
          ]}
        >
          {courses[i]}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* Add and edit banner */}
        <Image
          source={require('./Images/dish-banner.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Dish information form */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            {editId === -1
              ? 'Add New Dish'
              : 'Edit Menu Item'}
          </Text>

          <Text style={styles.sectionSubtitle}>
            {editId === -1
              ? 'Enter the new dish information below.'
              : 'Update the existing dish information below.'}
          </Text>

          {/* Dish name */}
          <View style={styles.inputWrapper}>

            <Text style={styles.inputLabel}>
              Dish Name
            </Text>

            <TextInput
              style={styles.modernInput}
              placeholder="Enter dish name"
              placeholderTextColor="#888"
              value={dishName}
              onChangeText={(newText) => setDishName(newText)}
            />

          </View>

          {/* Description */}
          <View style={styles.inputWrapper}>

            <Text style={styles.inputLabel}>
              Description
            </Text>

            <TextInput
              style={[
                styles.modernInput,
                styles.descriptionInput
              ]}
              placeholder="Enter a description"
              placeholderTextColor="#888"
              value={description}
              multiline
              onChangeText={(newText) => setDescription(newText)}
            />

          </View>

          {/* Select course */}
          <View style={styles.inputWrapper}>

            <Text style={styles.inputLabel}>
              Course
            </Text>

            <View style={styles.courseContainer}>
              {courseButtons}
            </View>

          </View>

          {/* Price input */}
          <View style={styles.inputWrapper}>

            <Text style={styles.inputLabel}>
              Price (R)
            </Text>

            <TextInput
              style={styles.modernInput}
              placeholder="Enter price"
              placeholderTextColor="#888"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(newText) => setPrice(newText)}
            />

          </View>

          {/* Error message */}
          {Error !== '' && (
            <View style={styles.errorBox}>

              <Text style={styles.errorText}>
                {Error}
              </Text>

            </View>
          )}

          {/* Save or update */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              if (onSave()) {
                navigation.navigate('MainScreen');
              }
            }}
          >
            <Text style={styles.primaryButtonText}>
              {editId === -1
                ? 'Save Menu Item'
                : 'Update Menu Item'}
            </Text>
          </TouchableOpacity>

          {/* Cancel button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              clearForm();
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

// PAGE 3: Search and filter menu items
function ListSkills({
  navigation,
  menuItems,
  searchText,
  setSearchText,
  selectedValue,
  setSelectedValue,
  Success,
  onEdit,
  deleteId,
  setDeleteId,
  onDelete
}: any) {

  const filters = [
    'All Courses',
    'Starter',
    'Main Course',
    'Dessert'
  ];

  const filterButtons: ReactNode[] = [];

  // Display filter options
  for (let i = 0; i < filters.length; i++) {

    filterButtons.push(
      <TouchableOpacity
        key={filters[i]}
        style={[
          styles.courseButton,
          selectedValue === filters[i] &&
            styles.selectedCourseButton
        ]}
        onPress={() => setSelectedValue(filters[i])}
      >
        <Text
          style={[
            styles.courseButtonText,
            selectedValue === filters[i] &&
              styles.selectedCourseButtonText
          ]}
        >
          {filters[i]}
        </Text>
      </TouchableOpacity>
    );
  }

  // Search and filter menu items
  const filteredItems: MenuItem[] = [];

  for (let i = 0; i < menuItems.length; i++) {

    const item = menuItems[i];

    const matchesName = item.dishName
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCourse =
      selectedValue === 'All Courses' ||
      item.course === selectedValue;

    if (matchesName && matchesCourse) {
      filteredItems.push(item);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Search and filter banner */}
        <Image
          source={require('./Images/search-banner.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Search section */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Find Menu Items
          </Text>

          <Text style={styles.sectionSubtitle}>
            Search by dish name or select a course
          </Text>

          {/* Search by name */}
          <View style={styles.inputWrapper}>

            <Text style={styles.inputLabel}>
              Search Dish Name
            </Text>

            <TextInput
              style={styles.modernInput}
              placeholder="e.g. Chicken Pasta"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={(newText) => setSearchText(newText)}
            />

          </View>

          {/* Filter by course */}
          <Text style={styles.inputLabel}>
            Filter by Course
          </Text>

          <View style={styles.courseContainer}>
            {filterButtons}
          </View>

          {/* Clear search and filters */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              setSearchText('');
              setSelectedValue('All Courses');
            }}
          >
            <Text style={styles.secondaryButtonText}>
              Clear Search and Filter
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

        {/* Number of matching items */}
        <View style={styles.resultsHeader}>

          <Text style={styles.sectionTitle}>
            Search Results
          </Text>

          <View style={styles.skillsCounter}>
            <Text style={styles.skillsCounterText}>
              {filteredItems.length}
            </Text>
          </View>

        </View>

        {/* Display search results */}
        {filteredItems.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyText}>
              No matching menu items found.
            </Text>

            <Text style={styles.sectionSubtitle}>
              Try another dish name or clear the filter.
            </Text>

          </View>

        ) : (

          <MenuItemsList
            items={filteredItems}
            onEdit={onEdit}
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            onDelete={onDelete}
          />

        )}

        {/* Back to menu */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MainScreen')}
        >
          <Text style={styles.secondaryButtonText}>
            Back to Main Menu
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

// PAGE 4: Menu statistics
function StatisticsScreen({
  navigation,
  menuItems
}: any) {

  let totalPrice = 0;
  let starterCount = 0;
  let mainCount = 0;
  let dessertCount = 0;

  // Calculate menu statistics
  for (let i = 0; i < menuItems.length; i++) {

    totalPrice = totalPrice + menuItems[i].price;

    if (menuItems[i].course === 'Starter') {
      starterCount++;
    }

    if (menuItems[i].course === 'Main Course') {
      mainCount++;
    }

    if (menuItems[i].course === 'Dessert') {
      dessertCount++;
    }
  }

  // Calculate average price
  let averagePrice = 0;

  if (menuItems.length > 0) {
    averagePrice = totalPrice / menuItems.length;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Statistics banner */}
        <Image
          source={require('./Images/statistics-banner.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Page heading */}
        <View style={styles.heroSection}>

          <Text style={styles.WelcomeTitle}>
            Menu Statistics
          </Text>

          <Text style={styles.welcomeSubtitle}>
            View an overview of your restaurant menu
          </Text>

        </View>

        {/* Menu summary */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Menu Summary
          </Text>

          {/* Total menu items */}
          <View style={styles.statCard}>

            <Text style={styles.statLabel}>
              Total Menu Items
            </Text>

            <Text style={styles.statValue}>
              {menuItems.length}
            </Text>

          </View>

          {/* Average price */}
          <View style={styles.statCard}>

            <Text style={styles.statLabel}>
              Average Price
            </Text>

            <Text style={styles.statValue}>
              R{averagePrice.toFixed(2)}
            </Text>

          </View>

          {/* Course statistics */}
          <Text style={styles.sectionTitle}>
            Course Breakdown
          </Text>

          {/* Starters */}
          <View style={styles.statCard}>

            <Text style={styles.statLabel}>
              Starters
            </Text>

            <Text style={styles.statValue}>
              {starterCount}
            </Text>

          </View>

          {/* Main courses */}
          <View style={styles.statCard}>

            <Text style={styles.statLabel}>
              Main Courses
            </Text>

            <Text style={styles.statValue}>
              {mainCount}
            </Text>

          </View>

          {/* Desserts */}
          <View style={styles.statCard}>

            <Text style={styles.statLabel}>
              Desserts
            </Text>

            <Text style={styles.statValue}>
              {dessertCount}
            </Text>

          </View>

          {/* Back to menu */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('MainScreen')}
          >
            <Text style={styles.primaryButtonText}>
              Back to Main Menu
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

// Application styling
const styles = StyleSheet.create({

  // Main background
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Logo and banners
  logoImage: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 15,
  },

  bannerImage: {
    width: '100%',
    height: 160,
    borderRadius: 15,
    marginBottom: 18,
  },

  // Welcome section
  heroSection: {
    backgroundColor: '#111111',
    borderRadius: 18,
    padding: 25,
    marginBottom: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  WelcomeTitle: {
    color: '#D4AF37',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  welcomeSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  // Main cards
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D4AF37',
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 10,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 16,
  },

  // Menu overview
  infoCard: {
    backgroundColor: '#111111',
    borderRadius: 14,
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  infoTitle: {
    color: '#D4AF37',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  counterText: {
    color: '#D4AF37',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 5,
  },

  // Input fields
  inputWrapper: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 8,
  },

  modernInput: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 9,
    padding: 13,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111111',
  },

  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  // Course selection
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  courseButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D4AF37',
    borderWidth: 1,
    borderRadius: 9,
    padding: 10,
    marginRight: 7,
    marginBottom: 8,
  },

  selectedCourseButton: {
    backgroundColor: '#111111',
    borderColor: '#D4AF37',
  },

  courseButtonText: {
    color: '#111111',
    fontSize: 13,
    fontWeight: 'bold',
  },

  selectedCourseButtonText: {
    color: '#D4AF37',
  },

  // Main buttons
  primaryButton: {
    backgroundColor: '#D4AF37',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 10,
  },

  primaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 9,
    padding: 13,
    alignItems: 'center',
    marginBottom: 10,
  },

  secondaryButtonText: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: 'bold',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },

  // Menu item cards
  menuCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 13,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#D4AF37',
    elevation: 2,
  },

  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  dishTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    flex: 1,
    marginRight: 10,
  },

  priceText: {
    fontSize: 17,
    color: '#8C6B00',
    fontWeight: 'bold',
  },

  descriptionText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 9,
    marginBottom: 12,
  },

  courseLabel: {
    color: '#8C6B00',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Edit and delete buttons
  editButton: {
    flex: 1,
    backgroundColor: '#8C6B00',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#ff0000',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
  },

  // Delete confirmation
  confirmBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  confirmText: {
    color: '#111111',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // Error messages
  errorBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ff0000',
    borderWidth: 2,
    padding: 12,
    borderRadius: 9,
    marginBottom: 15,
  },

  errorText: {
    color: '#ff0000',
    fontWeight: 'bold',
  },

  // Success messages
  successBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0aa54d',
    borderWidth: 2,
    padding: 12,
    borderRadius: 9,
    marginBottom: 16,
  },

  successText: {
    color: '#0aa54d',
    fontWeight: 'bold',
  },

  // Empty menu messages
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 25,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  emptyText: {
    color: '#555555',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },

  // Search results
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  skillsCounter: {
    backgroundColor: '#111111',
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  skillsCounterText: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },

  // Statistics
  statCard: {
    backgroundColor: '#111111',
    borderColor: '#D4AF37',
    borderWidth: 1,
    borderRadius: 12,
    padding: 19,
    marginBottom: 14,
  },

  statLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
  },

  statValue: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#D4AF37',
  },

});
