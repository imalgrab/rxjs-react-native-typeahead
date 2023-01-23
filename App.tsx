import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { interval } from 'rxjs';

const value$ = interval(1000);

export default function App() {
  const [value, setValue] = useState<number>();

  useEffect(() => {
    if (value$) {
      const subscription = value$.subscribe(setValue);
      return () => subscription.unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
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
  },
});
