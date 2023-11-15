import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, multiply } from 'react-native-scroll-indicator-always';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <View
          style={{ width: '100%', height: 400, backgroundColor: 'tomato' }}
        />
        <View style={{ width: '100%', height: 400, backgroundColor: 'blue' }} />
        <View
          style={{ width: '100%', height: 400, backgroundColor: 'green' }}
        />
        <View
          style={{ width: '100%', height: 400, backgroundColor: 'yellow' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
