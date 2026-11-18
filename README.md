# Chef's Menu Manager — MAST Final POE

## 1. Project Overview

Chef's Menu Manager is a mobile application developed using React Native, TypeScript and Expo. The application was created to help a chef manage restaurant menu items digitally instead of writing them down on paper.

This project continues from Part 2 of the MAST Portfolio of Evidence. In the final part, I improved the application by adding more functionality, improving the design and making it easier for the chef to use.

The application allows the chef to add, edit, update and delete dishes. It also includes searching, filtering and menu statistics.

## 2. Purpose of the Application

The main purpose of Chef's Menu Manager is to help the chef organise and manage restaurant dishes in one application.

The application aims to:

- Make it easier to add and manage dishes.
- Reduce mistakes when entering menu information.
- Allow the chef to find dishes quickly.
- Display useful information about the restaurant menu.
- Provide simple navigation between different pages.

## 3. Application Features

### Manage Menu Items

The chef can add new menu items by entering the dish name, description, course and price.

Existing menu items can also be edited, updated or deleted. Any changes made are immediately displayed in the application.

### Search and Filter

The chef can search for a dish using its name. The application also allows filtering by Starter, Main Course or Dessert.

A Clear Search and Filter button displays all menu items again.

### Menu Statistics

The statistics page displays the total number of menu items and calculates the average price.

It also shows how many dishes are available in each course.

### Validation and Feedback

The application checks that the chef enters the required information correctly. It displays error messages when information is missing or incorrect.

Success messages appear when menu items are added, updated or deleted. The application also asks for confirmation before deleting a dish.

## 4. Application Pages

The application contains four main pages.

**Page 1: Main Menu**

This is the home page of the application. It displays all menu items and the total number of dishes. The chef can add, edit or delete items and navigate to other pages.

**Page 2: Add/Edit Dish**

This page allows the chef to enter or update the dish name, description, course and price. The information is validated before being saved.

**Page 3: Search and Filter**

This page allows the chef to search for menu items by name and filter them according to their course. Matching dishes are displayed below the search section.

**Page 4: Menu Statistics**

This page displays the total number of dishes, average price and number of dishes in each course.

## 5. Application Sitemap

The sitemap shows the structure of the application and how the chef can navigate between pages.

- **Main Menu (Home)**
  - Add Menu Item → Add/Edit Dish Page
  - Edit Menu Item → Add/Edit Dish Page
  - Delete Menu Item → Confirmation on the current page
  - Search and Filter → Search and Filter Page
    - Edit Menu Item → Add/Edit Dish Page
    - Delete Menu Item → Confirmation on the current page
    - Back to Main Menu → Home
  - View Menu Statistics → Menu Statistics Page
    - Back to Main Menu → Home

After saving a new dish or updating an existing one, the application returns to the Main Menu.

## 6. Application Design

I improved the design of the application by changing the colour scheme to black, white and gold.

The application includes a logo and different banners for each page.

The design uses cards, buttons and clearly labelled input fields to keep the layout simple and organised.

The same colours and styling are used throughout the application to provide a consistent appearance.

## 7. Technologies Used

- **React Native:** Used to develop the application interface.
- **TypeScript:** Used to write the application code.
- **Expo:** Used to run and test the application.
- **React Navigation:** Used to navigate between pages.
- **Visual Studio Code:** Used to write and manage the project files.

The application also uses `useState`, arrays, functions, loops, conditional statements and `StyleSheet.create()`.

## 8. How to Run the Application

1. Open the project folder in Visual Studio Code.
2. Open the terminal.
3. Run `npm install` to install the required packages.
4. Run `npx expo start` to start the application.
5. Press `w` to open the application in a web browser, or open it on a supported mobile device using Expo Go.

## 9. Testing

The application should be tested to make sure all features work correctly.

The main tests include:

- Adding a new menu item.
- Updating an existing menu item.
- Deleting a menu item.
- Searching for a dish by its name.
- Filtering dishes by course.
- Clearing search and filter options.
- Checking that statistics update correctly.
- Entering incorrect information to test validation.
- Checking that navigation buttons work.

## 10. Limitations

The application currently stores menu items using `useState`.

This means that changes are displayed immediately while the application is running. However, menu items are not permanently stored and will be lost when the application restarts.


## 11. Reference List

App & Flow. [s.a.]. *React Native Safe Area Context: Getting started.* [online] Available at: https://appandflow.github.io/react-native-safe-area-context/ [Accessed 18 November 2026].

Expo. [s.a.]. *Expo documentation.* [online] Available at: https://docs.expo.dev/ [Accessed 18 November 2026].

Expo. [s.a.]. *Start developing.* [online] Available at: https://docs.expo.dev/get-started/start-developing/ [Accessed 18 November 2026].

MDN Web Docs. [s.a.]. *Array.prototype.filter().* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter [Accessed 18 November 2026].

MDN Web Docs. [s.a.]. *Array.prototype.some().* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some [Accessed 18 November 2026].

MDN Web Docs. [s.a.]. *String.prototype.includes().* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes [Accessed 18 November 2026].

OpenAI. 2026. *Chef's Menu Manager logo and application banners.* [AI-generated images]. Created using ChatGPT for the MAST Final POE project.

React. [s.a.]. *useState.* [online] Available at: https://react.dev/reference/react/useState [Accessed 18 November 2026].

React Native. [s.a.]. *Image.* [online] Available at: https://reactnative.dev/docs/image [Accessed 18 November 2026].

React Native. [s.a.]. *React Native documentation.* [online] Available at: https://reactnative.dev/docs/getting-started [Accessed 18 November 2026].

React Native. [s.a.]. *ScrollView.* [online] Available at: https://reactnative.dev/docs/scrollview [Accessed 18 November 2026].

React Native. [s.a.]. *StyleSheet.* [online] Available at: https://reactnative.dev/docs/stylesheet [Accessed 18 November 2026].

React Native. [s.a.]. *TextInput.* [online] Available at: https://reactnative.dev/docs/textinput [Accessed 18 November 2026].

React Native. [s.a.]. *TouchableOpacity.* [online] Available at: https://reactnative.dev/docs/touchableopacity [Accessed 18 November 2026].

React Navigation. [s.a.]. *Getting started.* [online] Available at: https://reactnavigation.org/docs/getting-started/ [Accessed 18 November 2026].

React Navigation. [s.a.]. *Native Stack Navigator.* [online] Available at: https://reactnavigation.org/docs/native-stack-navigator/ [Accessed 18 November 2026].

TypeScript. [s.a.]. *TypeScript documentation.* [online] Available at: https://www.typescriptlang.org/docs/ [Accessed 18 November 2026].

## 12. Conclusion

The final Chef's Menu Manager application builds on the work completed in Part 2.

The new features allow the chef to manage menu items, search and filter dishes, and view menu statistics.

The improved design, validation and navigation also make the application more organised and user-friendly.
