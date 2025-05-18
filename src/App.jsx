import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React, { useState, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TimerProvider } from '../src/context/TimerContext';
import { ThemeContext } from '../src/context/ThemeContext';

import HomeScreen from '../src/screens/HomeScreen';
import TimersListScreen from '../src/screens/TimersListScreen'; 
import HistoryScreen from '../src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function TimersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TimersList" 
        component={TimersListScreen} 
        options={{ title: 'Timers List' }} 
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Timers') iconName = 'timer-outline';
          else if (route.name === 'History') iconName = 'time-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDark ? '#61dafb' : '#007aff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Timers" component={TimersStack} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TimerProvider>
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppNavigator />
        </NavigationContainer>
      </TimerProvider>
    </ThemeContext.Provider>
  );
}
