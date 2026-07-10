import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = [
  { id: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
  { id: 'evening', label: 'Evening (4 PM - 8 PM)' }
];

export default function TimetableScreen({ navigation }) {
  // Storing dynamic availability in an object state
  const [schedule, setSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  });

  const toggleSlot = (day, slotId) => {
    const currentSlots = schedule[day];
    let updatedSlots;

    if (currentSlots.includes(slotId)) {
      // Removing slot if already selected
      updatedSlots = currentSlots.filter(id => id !== slotId);
    } else {
      // Add slot if not selected
      updatedSlots = [...currentSlots, slotId];
    }

    setSchedule({
      ...schedule,
      [day]: updatedSlots
    });
  };