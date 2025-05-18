import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import { TimerContext } from '../context/TimerContext';

export default function TimerCard({ timer }) {
  const { updateTimer, completeTimer } = useContext(TimerContext);
  const [remaining, setRemaining] = useState(timer.remaining);
  const [running, setRunning] = useState(timer.running || false);
  const [modalVisible, setModalVisible] = useState(false);
  const halfwayAlerted = useRef(false);

  useEffect(() => {
    setRemaining(timer.remaining);
    setRunning(timer.running);
  }, [timer.remaining, timer.running]);

  useEffect(() => {
    let interval = null;
    if (running && remaining > 0) {
      interval = setInterval(() => {
        setRemaining(prev => {
          const next = prev - 1;
          if (!halfwayAlerted.current && next <= timer.duration / 2) {
            halfwayAlerted.current = true;
            Alert.alert('Halfway there!', `${timer.name} is halfway done.`);
          }
          if (next <= 0) {
            clearInterval(interval);
            setRunning(false);
            setModalVisible(true);
            completeTimer(timer.id);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    updateTimer(timer.id, { remaining, running });
  }, [remaining, running]);

  const progress = ((timer.duration - remaining) / timer.duration) * 100;

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(timer.duration);
    halfwayAlerted.current = false;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>Category: {timer.category}</Text>
      <Text>Status: {running ? 'Running' : 'Paused'}</Text>
      <Text>Time Left: {Math.floor(remaining / 60)}:{(remaining % 60).toString().padStart(2, '0')}</Text>
      <ProgressBar progress={progress} />
      <View style={styles.buttons}>
        {!running ? <Button title="Start" onPress={start} /> : <Button title="Pause" onPress={pause} />}
        <Button title="Reset" onPress={reset} />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Timer "{timer.name}" completed!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10, borderRadius: 8,
    backgroundColor: 'white',
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white', padding: 20, borderRadius: 10, minWidth: 250, alignItems: 'center',
  },
});
