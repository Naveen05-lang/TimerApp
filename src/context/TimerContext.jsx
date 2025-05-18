import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);

 
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTimers = await AsyncStorage.getItem('timers');
        const savedHistory = await AsyncStorage.getItem('history');
        if (savedTimers) setTimers(JSON.parse(savedTimers));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);


  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('timers', JSON.stringify(timers));
        await AsyncStorage.setItem('history', JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };
    saveData();
  }, [timers, history]);


  const addTimer = (timer) => {
    setTimers(prev => [...prev, timer]);
  };


  const updateTimer = (id, newData) => {
    setTimers(prev =>
      prev.map(timer => (timer.id === id ? { ...timer, ...newData } : timer))
    );
  };


  const completeTimer = (id) => {
    const timer = timers.find(t => t.id === id);
    if (timer) {
      const completedEntry = {
        id: Date.now().toString(),
        name: timer.name,
        category: timer.category,
        duration: timer.duration,
        completedAt: new Date().toISOString(),
      };
      setHistory(prev => [completedEntry, ...prev]);
      updateTimer(id, { status: 'Completed', remaining: 0, running: false });
    }
  };

 
  const bulkAction = (category, action) => {
    setTimers(prev =>
      prev.map(timer => {
        if (timer.category === category) {
          if (action === 'start') return { ...timer, running: true, status: 'Running' };
          if (action === 'pause') return { ...timer, running: false, status: 'Paused' };
          if (action === 'reset')
            return { ...timer, running: false, status: 'Idle', remaining: timer.duration };
        }
        return timer;
      })
    );
  };


  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem('history');
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        history,
        addTimer,
        updateTimer,
        completeTimer,
        bulkAction,
        clearHistory,
        setTimers,
        setHistory,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
