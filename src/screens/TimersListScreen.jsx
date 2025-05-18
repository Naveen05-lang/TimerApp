import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TimerContext } from '../context/TimerContext';
import CategorySection from '../components/CategorySection';
import { ThemeContext } from '../context/ThemeContext';

export default function TimersListScreen() {
  const { timers } = useContext(TimerContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [filter, setFilter] = useState('None'); 


  const categories = [...new Set(timers.map(t => t.category))];
  if (!categories.includes('General')) categories.push('General');

  const groupedTimers = timers.reduce((acc, timer) => {
    if (filter !== 'All' && timer.category !== filter) return acc;
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const styles = themedStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Filter by Category</Text>

      <Picker
        selectedValue={filter}
        onValueChange={setFilter}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />
        {categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
      </Picker>

      <FlatList
        data={Object.entries(groupedTimers)}
        keyExtractor={([category]) => category}
        renderItem={({ item: [category, timers] }) => (
          <CategorySection category={category} timers={timers} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No timers available for selected category.
          </Text>
        }
        style={{ marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const themedStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#f4f4f4',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 10,
      color: isDark ? '#e0e0e0' : '#222222',
    },
    picker: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      borderRadius: 8,
      marginBottom: 10,
    },
    emptyText: {
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: 30,
      color: isDark ? '#888888' : '#666666',
    },
  });
