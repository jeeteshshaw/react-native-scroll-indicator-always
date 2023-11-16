
```markdown
# React Native Scroll Indicator Always

[![npm version](https://badge.fury.io/js/react-native-scroll-indicator-always.svg)](https://badge.fury.io/js/react-native-scroll-indicator-always)

A React Native package that provides an always visible scroll indicator for ScrollView and FlatList components, built on top of [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view).

## Installation

Make sure you have [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view) installed. If not, you can install it using:

```bash
npm install react-native-keyboard-aware-scroll-view
```

Now, install the scroll indicator package:

```bash
npm install react-native-scroll-indicator-always
```

or

```bash
yarn add react-native-scroll-indicator-always
```

## Usage

### Example 1: Using KeyboardAwareScrollView with ScrollView and FlatList

```jsx
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  FlatList,
  ScrollView,
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-scroll-indicator-always';
import { KeyboardAwareScrollView as KeyboardAwareScrollViewRef } from 'react-native-keyboard-aware-scroll-view';

export default function App() {
  const scr = React.useRef<KeyboardAwareScrollViewRef>(null);
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    setTimeout(() => {
      console.log("scr1", scr.current);
    }, 1000);
  }, []);

  return (
    <KeyboardAwareScrollView ref={scr} scrollEventThrottle={60}>
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
    </KeyboardAwareScrollView>
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
```

### Example 2: Using Only ScrollView

```jsx
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, KeyboardAwareScrollViewProps } from 'react-native-scroll-indicator-always';

export default function App() {
  const scr = React.useRef<KeyboardAwareScrollViewProps>(null);

  return (
    <ScrollView ref={scr} scrollEventThrottle={60}>
      <View style={styles.container}>
        <Text>This is a sample ScrollView with an always visible scroll indicator.</Text>
        {/* Your ScrollView content here */}
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
});
```

### Example 3: Using Only FlatList

```jsx
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList, KeyboardAwareScrollViewProps } from 'react-native-scroll-indicator-always';

export default function App() {
  const scr = React.useRef<KeyboardAwareScrollViewProps>(null);

  const data = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  return (
    <FlatList
      ref={scr}
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
```

