import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button, Alert } from 'react-native';
import TimerCard from './TimerCard';
import { TimerContext } from '../context/TimerContext';

export default function CategorySection({ category, timers }) {
  const [expanded, setExpanded] = useState(true);
  const { bulkAction } = useContext(TimerContext);

  const handleBulk = (action) => {
    bulkAction(category, action);
    Alert.alert(`Bulk action`, `${action.toUpperCase()} all timers in "${category}"`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.header}>
        <Text style={styles.title}>{category} ({timers.length})</Text>
        <Text>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <>
          <View style={styles.bulkButtons}>
            <Button title="Start All" onPress={() => handleBulk('start')} />
            <Button title="Pause All" onPress={() => handleBulk('pause')} />
            <Button title="Reset All" onPress={() => handleBulk('reset')} />
          </View>
          <FlatList
            data={timers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TimerCard timer={item} />}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  header: {
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  title: { fontWeight: 'bold', fontSize: 18 },
  bulkButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
