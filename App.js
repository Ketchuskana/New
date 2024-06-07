import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { FavoritesProvider } from './context/FavoritesContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Favorites" component={FavoritesStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
