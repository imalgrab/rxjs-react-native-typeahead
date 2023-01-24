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
import { Airport, getAirportsByName } from './api/client';
import { useSubscription } from './hooks/useSubscription';

const input$ = new BehaviorSubject('');

export default function App() {
  const [suggestions, setSuggestions] = useState<Airport[]>([]);

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
      switchMap((text) => getAirports(text))
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
        {suggestions.map((suggestion) => (
          <Text key={`${suggestion.name}-${suggestion.icao}`}>
            {suggestion.name} - {suggestion.country}
          </Text>
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
