import React, { useContext } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Dark Mode</Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'flex-end', paddingRight: 15 }
});
