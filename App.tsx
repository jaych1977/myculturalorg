import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from './constants';
import AboutUsScreen from './screens/AboutUsScreen';
import EventCalendarScreen from './screens/EventCalendarScreen';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * About Us Stack Navigator
 */
const AboutUsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AboutUsMain"
        component={AboutUsScreen}
        options={{ title: 'About Us' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Event Calendar Stack Navigator
 */
const EventCalendarStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="EventCalendarMain"
        component={EventCalendarScreen}
        options={{ title: 'Event Calendar' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Payment Stack Navigator
 */
const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PaymentMain"
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />
    </Stack.Navigator>
  );
};

/**
 * Bottom Tab Navigator
 */
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.lightGray,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="AboutUs"
        component={AboutUsStackNavigator}
        options={{
          tabBarLabel: 'About Us',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EventCalendar"
        component={EventCalendarStackNavigator}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-multiple" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentStackNavigator}
        options={{
          tabBarLabel: 'Donate',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Main App Component
 */
export default function App() {
  useEffect(() => {
    // Set status bar style
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.primary}
          translucent={false}
        />
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}
