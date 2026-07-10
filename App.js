import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import our external clean screens
import LoginScreen from './screens/LoginScreen';
import TimetableScreen from './screens/TimetableScreen';
import JobFeedScreen from './screens/JobFeedScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Timetable" component={TimetableScreen} options={{ title: 'Your Schedule' }} />
        <Stack.Screen name="JobFeed" component={JobFeedScreen} options={{ title: 'Available Shifts' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}