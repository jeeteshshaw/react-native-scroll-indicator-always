import {
  Dimensions,
  FlatList as FlatlistNativeScroll,
  type FlatListProps as FlatlistPropsNativeScroll,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
  Animated,
  type NativeScrollVelocity,
  type ViewStyle,
} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  type FC,
  useEffect,
} from 'react';

const { height } = Dimensions.get('window');

interface FlatListProps<ItemT> extends FlatlistPropsNativeScroll<ItemT> {
  showAlways?: boolean;
  indicatorColor?: string;
  indicatorWidth?: number;
  indicatorborder?: number;
}

const FlatList: FC<FlatListProps<any>> = (props) => {
  const scroll = useRef<FlatlistNativeScroll>(null);
  const scrolAnimation = useRef<Animated.Value>(new Animated.Value(1)).current;
  const [ScrolledSize, setScrolledSize] = useState<number>(1);

  const animation = useCallback(
    (val: number, velocity: NativeScrollVelocity | undefined, ch) => {
      Animated.spring(scrolAnimation, {
        toValue: height * (val / ch),
        useNativeDriver: true,
        bounciness: 8,
        velocity,
        delay: 0,
      }).start();
    },
    [scrolAnimation]
  );

  const _Scrolled = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrolledSize(event.nativeEvent.contentSize.height);
      animation(
        event.nativeEvent.contentOffset.y,
        event.nativeEvent.velocity,
        event.nativeEvent.contentSize.height
      );
    },
    [animation]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      scroll.current?.scrollToOffset({ offset: 1 });
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const indicator = height / (ScrolledSize / height);
  return (
    <View style={styles.container}>
      <FlatlistNativeScroll
        {...props}
        ref={scroll}
        onScroll={_Scrolled}
        onLayout={(e) => console.log(e.nativeEvent.layout)}
        scrollEventThrottle={70}
        showsVerticalScrollIndicator={false}
      >
        {props.children}
      </FlatlistNativeScroll>
      <Animated.View
        style={styles.indicatorView(
          indicator,
          scrolAnimation,
          props.indicatorColor,
          props.indicatorWidth,
          props.indicatorborder
        )}
      />
    </View>
  );
};

export default FlatList;

FlatList.defaultProps = {
  indicatorborder: 20,
  indicatorColor: '#303030',
  indicatorWidth: 4,
  showAlways: true,
};

type indicatorView = (
  height: number,
  scrolAnimation: Animated.Value,
  color: string,
  width: number,
  borderRadius: number
) => ViewStyle;

type Styles = {
  indicatorView: indicatorView;
};

const styles = StyleSheet.create<Styles | any>({
  indicatorView: (
    height: number,
    scrolAnimation: Animated.Value,
    color: string,
    width: number,
    borderRadius: number
  ) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: width,
    backgroundColor: color,
    height,
    borderRadius,
    transform: [{ translateY: scrolAnimation }],
  }),
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
});
