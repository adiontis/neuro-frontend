// Import necessary React Native components
import React, { useState, useEffect } from 'react';
// These are the basic building blocks for mobile UI
import { 
  View,        // Like a <div> in web
  Text,        // Like a <p> or <span> in web
  TextInput,   // Like an <input> in web
  TouchableOpacity,  // Like a <button> in web
  StyleSheet   // For styling (similar to CSS)
} from 'react-native';

function App() {
  // State management for your app data
  const [goals, setGoals] = useState([]); // Stores all goals
  const [quote, setQuote] = useState(null); // Stores the current quote
  const [newGoal, setNewGoal] = useState({ title: '', description: '' }); // For new goal input

  // Main app layout
  return (
    // View is like a container div
    <View style={styles.app}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.h1}>NEURO::v1.0</Text>
      </View>

      {/* Quote Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>> QUOTE.exe</Text>
        {quote && (
          <View>
            <Text>"{quote.text}"</Text>
            <Text style={styles.author}>- {quote.author}</Text>
          </View>
        )}
      </View>

      {/* New Goal Input Form */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>> NEW_GOAL.exe</Text>
        {/* Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Goal Title"
          placeholderTextColor="#666"
          value={newGoal.title}
          onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
        />
        {/* Description Input */}
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Description"
          placeholderTextColor="#666"
          multiline
          value={newGoal.description}
          onChangeText={(text) => setNewGoal({ ...newGoal, description: text })}
        />
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={addGoal}>
          <Text style={styles.buttonText}>INITIALIZE GOAL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the app (similar to CSS but using React Native's StyleSheet)
const styles = StyleSheet.create({
  // Main container style
  app: {
    flex: 1,               // Takes up full screen
    padding: 20,           // Padding around edges
    backgroundColor: '#0A0A0A',  // Dark background
  },
  // Header styles
  header: {
    alignItems: 'center',  // Center content horizontally
    marginBottom: 32,      // Space below header
  },
  // Main title style
  h1: {
    fontSize: 28,
    color: '#FFB000',      // Gold color
    fontWeight: 'bold',
  },
  // Card container style
  card: {
    backgroundColor: '#1A1A1A',  // Dark grey
    borderRadius: 4,             // Rounded corners
    padding: 20,
    marginBottom: 20,
  },
  // Card header style
  cardHeader: {
    color: '#00FF00',      // Green color
    marginBottom: 16,
    fontSize: 18,
  },
  // Input field style
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#444',
    color: '#FFB000',      // Gold text
  },
  // Button style
  button: {
    backgroundColor: '#444',
    padding: 10,
    alignItems: 'center',  // Center button text
  },
  // Button text style
  buttonText: {
    color: '#FFB000',      // Gold text
  },
});

export default App;