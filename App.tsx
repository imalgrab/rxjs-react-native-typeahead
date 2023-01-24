import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  interval,
  map,
  switchMap,
} from 'rxjs';
import { getAirportsByName } from './api/client';
import { useSubscription } from './hooks/useSubscription';

const SUGGESTIONS = [
  'react',
  'react native',
  'redux',
  'redux toolkit',
  'redux.js',
  'redux saga',
  'remix',
  'reactive extension',
  'rxjs',
];

const input$ = new BehaviorSubject('');

export default function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  function getAirports(name: string) {
    return from(getAirportsByName(name)).pipe(
      map((airports) => airports.slice(0, 10))
    );
  }

  function handleTextChange(text: string) {
    input$.next(text);
  }

  useSubscription(
    input$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((text) => text.length > 1),
      switchMap((text) => getAirports(text)),
      map((airports) => airports.map((airport) => airport.name))
    ),
    (airports) => setSuggestions(airports)
  );

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={handleTextChange}
        placeholder="Type here..."
        style={styles.input}
      />
      <View>
        {suggestions.map((suggestion, i) => (
          <Text key={`${suggestion}-${i}`}>{suggestion}</Text>
        ))}
      </View>
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
