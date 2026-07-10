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
const handleSave = () => {
    // Navigate to job feed and pass the schedule data along
    navigation.navigate('JobFeed', { userSchedule: schedule });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Your Free Windows</Text>
      <Text style={styles.subHeader}>Tap the blocks when you are available to work shifts.</Text>

      <ScrollView style={styles.scrollContainer}>
        {DAYS.map((day) => (
          <View key={day} style={styles.dayRow}>
            <Text style={styles.dayText}>{day}</Text>
            <View style={styles.slotsContainer}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = schedule[day].includes(slot.id);
                return (
                  <TouchableOpacity
                    key={slot.id}
                    style={[styles.slotButton, isSelected && styles.selectedButton]}
                    onPress={() => toggleSlot(day, slot.id)}
                  >
                    <Text style={[styles.slotText, isSelected && styles.selectedText]}>
                      {slot.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE & SEARCH JOBS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    marginTop: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  dayRow: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 15,
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007AFF',
  },
  slotsContainer: {
    gap: 8,
  },
  slotButton: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#34C759', // Green for available slots
  },
  slotText: {
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
