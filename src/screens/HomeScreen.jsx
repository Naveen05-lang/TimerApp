import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { TimerContext } from '../context/TimerContext';
import { ThemeContext } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function HomeScreen() {
  const { addTimer } = useContext(TimerContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('General');

  const addNewTimer = () => {
    if (!name || !duration) {
      alert('Please enter both name and duration');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration) * 60,
      remaining: parseInt(duration) * 60,
      category,
      status: 'Idle',
      running: false,
    };

    addTimer(newTimer);
    setName('');
    setDuration('');
    setCategory('General');
    navigation.navigate('TimersList');
  };

  const styles = themedStyles(isDark);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
        
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
            <View style={styles.header}>
            <Text style={styles.appTitle}>Timer App</Text>
            <ThemeSwitcher />
            </View>
          <Text style={styles.sectionTitle}>Add New Timer</Text>

          <Text style={styles.label}>Timer Name :</Text>
          <TextInput
            placeholder="Timer Name"
            placeholderTextColor={isDark ? '#aaa' : '#888'}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Duration :</Text>
          <TextInput
            placeholder="Duration (minutes)"
            placeholderTextColor={isDark ? '#aaa' : '#888'}
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />

          <Text style={styles.label}>Category :</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={styles.picker}
              dropdownIconColor={isDark ? '#fff' : '#000'}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="General" value="General" />
              <Picker.Item label="PlayTime" value="PlayTime" />
              <Picker.Item label="Relaxation" value="Relaxation" />
              <Picker.Item label="Workouts" value="Workouts" />
              <Picker.Item label="StudyTime" value="StudyTime" />
              <Picker.Item label="Eating" value="Eating" />
            </Picker>
          </View>

          <View style={styles.buttonWrapper}>
            <Button title="Add Timer" onPress={addNewTimer} color={isDark ? '#61dafb' : '#0077cc'} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const themedStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#f4f4f4',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      // iOS shadow properties
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      // Android elevation
      elevation: 5,
    },
    header: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:50
    },
    appTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDark ? '#61dafb' : '#0077cc',
      letterSpacing: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 10,
      color: isDark ? '#e0e0e0' : '#222222',
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ccc',
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      fontSize: 16,
    },
    pickerWrapper: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ccc',
      borderRadius: 10,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      overflow: 'hidden',
    },
    picker: {
      color: isDark ? '#ffffff' : '#000000',
    },
    label: {
      marginBottom: 4,
      color: isDark ? '#dddddd' : '#333333',
      fontWeight: '500',
    },
    buttonWrapper: {
      marginTop: 20,
    },
  });
