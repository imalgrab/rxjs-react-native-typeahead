import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { interval } from 'rxjs';
import { useSubscription } from './hooks/useSubscription';

export default function App() {
  const [label, setLabel] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setLabel}
        placeholder="Type here..."
        style={styles.input}
      />
      <Text>Label text: {label}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    width: '100%',
    padding: 16,
    fontSize: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
