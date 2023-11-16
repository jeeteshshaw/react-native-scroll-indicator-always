Certainly! Below is an updated README for your React Native Scroll Indicator Always package that includes information about the `FlatList` component:

---

# react-native-scroll-indicator-always

[![npm version](https://badge.fury.io/js/react-native-scroll-indicator-always.svg)](https://badge.fury.io/js/react-native-scroll-indicator-always)

A React Native library providing a `ScrollView` and `FlatList` with an always-visible scroll indicator.

## Installation

Install the package using your preferred package manager:

```bash
npm install react-native-scroll-indicator-always
```

or

```bash
yarn add react-native-scroll-indicator-always
```

## Usage

Import the components from `react-native-scroll-indicator-always`:

```jsx
import { ScrollView, FlatList } from 'react-native-scroll-indicator-always';
```

Use `ScrollView` or `FlatList` as you would use the standard React Native components. The scroll indicator will always be visible.

### ScrollView Example

```jsx
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView as NativeScroll,
} from 'react-native';
import { ScrollView } from 'react-native-scroll-indicator-always';

export default function App() {
  const scr = React.useRef<NativeScroll>(null);

  React.useEffect(() => {
    setTimeout(() => {
      scr.current?.scrollTo({ y: 1000 });
      console.log("scrollRef", scr.current);
    }, 1000);
  }, []);

  return (
    <ScrollView ref={scr}>
      <View style={styles.container}>
        <Text>Your App Content Goes Here</Text>
        {/* Add your components */}
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

### FlatList Example

```jsx
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList as NativeFlatlist,
} from 'react-native';
import { FlatList } from 'react-native-scroll-indicator-always';

export default function App() {
  const scr = React.useRef<NativeFlatlist<any>>(null);

  React.useEffect(() => {
    setTimeout(() => {
      scr.current?.scrollToOffset({ offset: 1000 });
      console.log("flatListRef", scr.current);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={scr}
        data={["green", "red", "blue", "yellow"]}
        renderItem={({ item }) => (
          <View style={{ width: '100%', height: 400, backgroundColor: item }} />
        )}
      />
    </View>
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

## Props

The `ScrollView` and `FlatList` components accept the same props as their React Native counterparts, along with the following additional props:

- `showAlways`: *(boolean)* - Set to `true` to always show the scroll indicator. Default is `true`.
- `indicatorColor`: *(string)* - Color of the scroll indicator. Default is `'#303030'`.
- `indicatorWidth`: *(number)* - Width of the scroll indicator. Default is `4`.
- `indicatorborder`: *(number)* - Border radius of the scroll indicator. Default is `20`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Feel free to customize this README further based on the specifics of your package. Add any additional details, installation instructions, or usage examples that would help users understand and integrate your library.