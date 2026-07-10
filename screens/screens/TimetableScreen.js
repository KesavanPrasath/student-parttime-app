import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = [
  { id: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
  { id: 'evening', label: 'Evening (4 PM - 8 PM)' }
];