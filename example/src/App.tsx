import * as React from 'react';

import { StyleSheet, View, Text, FlatList as NativeFlatlist } from 'react-native';
import { ScrollView, GestureScrollView} from 'react-native-scroll-indicator-always';
import {KeyboardAwareScrollView as KeyboardAwareScrollViewRef, }  from "react-native-keyboard-aware-scroll-view"
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  const [result, setResult] = React.useState<number>(0)
  const scr = React.useRef<KeyboardAwareScrollViewRef>(null)
  React.useEffect(() => {
    // multiply(3, 7).then(setResult);
    setTimeout(() => {
      
      // scr.current?.scrollToOffset({ offset: 1000 });
      // console.log("scr1",scr.current)
    }, 1000);
  }, []);

  // return (
  //   <View style={{flex:1}}>
  //     <FlatList ref={scr} data={["green", "red", "blue", "yellow"]} renderItem={({item})=>(
  //       <View style={{ width: '100%', height: 400, backgroundColor: item }} />

  //     )}  />

  //   </View>
  // )
  // return (
  //   <GestureHandlerRootView>

  //     <GestureScrollView scrollEventThrottle={30}>
  //     <View style={styles.container}>
  //       {/* <Text>Result: {result}</Text> */}
  //       <View
  //         style={{ width: '100%', height: 400, backgroundColor: 'tomato' }}
  //       />
  //       <View style={{ width: '100%', height: 400, backgroundColor: 'blue' }} />
  //       <View
  //         style={{ width: '100%', height: 400, backgroundColor: 'green' }}
  //       />
  //       <View
  //         style={{ width: '100%', height: 400, backgroundColor: 'yellow' }}
  //       />
  //     </View>
  //     </GestureScrollView>
  //   </GestureHandlerRootView>
  // )
  return (
    <ScrollView ref={scr} scrollEventThrottle={60} decelerationRate={"fast"}>
      <View style={styles.container}>
        {/* <Text>Result: {result}</Text> */}
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
