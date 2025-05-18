import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  bar: {
    height: 8,
    backgroundColor: '#4caf50',
  },
});
