import * as React from 'react';

import { StyleSheet, View, Text, FlatList as NativeFlatlist, type NativeScrollEvent, ScrollView as NativeScroll, type ScrollViewProps } from 'react-native';
import { FlatList, ScrollView } from 'react-native-scroll-indicator-always';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const scr = React.useRef<NativeScroll>(null)
  React.useEffect(() => {
    // multiply(3, 7).then(setResult);
    setTimeout(() => {
      
      // scr.current && scr.current?.scrollTo({ offset: 1000 });
      scr.current?.scrollTo({ y: 1000 });

      console.log("scr1",scr.current)
    }, 1000);
  }, []);

  // return (
  //   <View style={{flex:1}}>
  //     <FlatList ref={scr} data={["green", "red", "blue", "yellow"]} renderItem={({item})=>(
  //       <View style={{ width: '100%', height: 400, backgroundColor: item }} />

  //     )}  />

  //   </View>
  // )

  return (
    <ScrollView ref={scr}>
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
