import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

// Mock list of jobs posted by local businesses
const JOBS_DATA = [ 

    {
    id: '1',
    title: 'Centra - Floor Assistant',
    day: 'Monday',
    slot: 'morning',
    pay: '€12.50/hr'
  },
  {
    id: '2',
    title: 'Spar - Deli Associate',
    day: 'Tuesday',
    slot: 'afternoon',
    pay: '€13.00/hr'
  },
  {
    id: '3',
    title: 'Tesco - Stock Replenishment',
    day: 'Wednesday',
    slot: 'evening',
    pay: '€12.80/hr'
  },
  {
    id: '4',
    title: 'Local Café - Barista',
    day: 'Friday',
    slot: 'morning',
    pay: '€13.50/hr'
  }
];

export default function JobFeedScreen({ route }) {
  // Get the schedule object passed from the timetable screen
  const { userSchedule } = route.params || {
    userSchedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] }
  };

  // Keep jobs where the user selected that day and slot as available
  const matchingJobs = JOBS_DATA.filter(job => {
    const availableSlotsForDay = userSchedule[job.day] || [];
    return availableSlotsForDay.includes(job.slot);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Shifts For You</Text>
      <Text style={styles.subHeader}>These jobs match your university schedule completely.</Text>

      {matchingJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No shifts match your current availability.</Text>
          <Text style={styles.emptySubText}>Try opening up more time blocks in your timetable.</Text>
        </View>
      ) : (
        <FlatList
          data={matchingJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <View>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobDetails}>{item.day} • {item.slot.toUpperCase()}</Text>
              </View>
              <Text style={styles.jobPay}>{item.pay}</Text>
            </View>
          )}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
  jobCard: {
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  jobPay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
});