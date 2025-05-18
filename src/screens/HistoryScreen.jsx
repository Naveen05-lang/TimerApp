import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  useColorScheme,
} from 'react-native';
import { TimerContext } from '../context/TimerContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HistoryScreen() {
  const { history, clearHistory } = useContext(TimerContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const styles = createStyles(isDark);

  const renderItem = ({ item }) => {
    const date = new Date(item.completedAt).toLocaleDateString();
    const time = new Date(item.completedAt).toLocaleTimeString();

    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>Category: {item.category}</Text>
        <Text style={styles.text}>Duration: {item.duration / 60} min</Text>
        <Text style={styles.text}>Completed: {date} {time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer History</Text>
      <View style={styles.buttonWrapper}>
        <Button title="Clear History" onPress={clearHistory} color="red" />
      </View>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No history available.</Text>
        }
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const createStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#f9f9f9',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 12,
    },
    item: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      padding: 16,
      borderRadius: 10,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#61dafb' : '#007aff',
      marginBottom: 6,
    },
    text: {
      color: isDark ? '#e0e0e0' : '#333333',
      fontSize: 14,
    },
    emptyText: {
      color: isDark ? '#aaaaaa' : '#777777',
      textAlign: 'center',
      marginTop: 30,
      fontStyle: 'italic',
    },
    buttonWrapper: {
      marginBottom: 10,
      alignSelf: 'flex-start',
    },
    list: {
      marginTop: 10,
    },
  });
